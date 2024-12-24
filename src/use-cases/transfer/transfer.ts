import { IUserRepository } from "@/repositories/customer-repository"
import { InvalidCredentialsError } from "../errors/invalid-credentials-error"
import { TransferStatus, ITransfer, ErrorTransferCategories } from "@/models/ITransfer"
import { ITransferRepository, TransferStorage } from "@/repositories/transfer-repository"
import {
  InsufficientBalanceTransferError,
  SelfTransferError,
  TransactionAnyException,
  UnauthorizedRoleError,
} from "@/use-cases/errors/transfer-errors"
import { IUser } from "@/models/IUser"
import { v4 as uuidv4 } from "uuid"
import { Prisma } from "@prisma/client"
import { normalizeBalanceType } from "@/utils/validation"

export class TransferRepository implements ITransferRepository {
  constructor(
    private readonly customerRepository: IUserRepository,
    private readonly transferRepository: TransferStorage,
  ) {}

  async validateTransferRules(data: ITransfer): Promise<boolean> {
    const sender = await this.customerRepository.findById(data.senderId) as IUser
    const receiver = await this.customerRepository.findById(data.receiverId) as IUser

    if (!sender || !receiver) throw new InvalidCredentialsError()

    this.preventSelfTransfer(data)

    const senderBalance = normalizeBalanceType(sender.total_balance)

    this.validateSenderBalance(senderBalance, data.value)

    this.validateUserRolePermission(sender)

    this.validateSenderValidity(sender)

    return true
  }

  private validateUserRolePermission(user: IUser): void {
    if (user.role === "store_owner") throw new UnauthorizedRoleError()
  }

  private validateSenderValidity(isValidSender: IUser | null): void {
    if (!isValidSender) throw new InvalidCredentialsError()
  }

  private validateSenderBalance(balance: Prisma.Decimal, value: number): void {
    if (balance.lessThan(value)) throw new InsufficientBalanceTransferError()

    // Using balance like Prisma Decimal its a great advantage here bc we can apply some nativa methods like .lessThan, .minus, .plus
  }

  private preventSelfTransfer(data: ITransfer): void {
    if (data.senderId === data.receiverId) throw new SelfTransferError()
  }

  private generateTransactionId(): string {
    return uuidv4()
  }

  async create(data: ITransfer): Promise<ITransfer> {
    const sender = await this.customerRepository.findById(data.senderId) as IUser
    const receiver = await this.customerRepository.findById(data.receiverId) as IUser

    if (!sender || !receiver) throw new InvalidCredentialsError()
      
    const senderBalance = normalizeBalanceType(sender.total_balance)
   
    const receiverBalance = normalizeBalanceType(receiver.total_balance)
 
    sender.total_balance = senderBalance.minus(data.value)

    receiver.total_balance = receiverBalance.plus(data.value)
  
    let transactionInitialized: ITransfer = {
      ...data,
      id: uuidv4(),
      status: TransferStatus.PENDING,
      createdAt: new Date(),
    }

    if (!transactionInitialized) throw new TransactionAnyException()

    const transactionCompleted: ITransfer = {
      ...transactionInitialized,
      status: TransferStatus.COMPLETED,
    }

    this.transferRepository.save(transactionCompleted)

    return transactionCompleted
  }
}

export class TransferService {
  constructor(
    private readonly customerRepository: IUserRepository,
    private readonly transferRepository: TransferRepository,
  ) {}

  async transfer(data: ITransfer): Promise<ITransfer> {
    try {
      await this.transferRepository.validateTransferRules(data)

      const transaction = await this.transferRepository.create(data)

      return transaction
    } catch (error) {
      if (error instanceof Error) {
        const errorCode = this.defineErrorCodeMapper(error)
        throw new Error(`Erro ao realizar transferência: ${error.message} (Código de erro: ${errorCode})`)
      }

      throw new Error(`Erro ao realizar transferência`)
    }
  }

  private defineErrorCodeMapper(error: Error): string {
    const errorCodeMap: Record<ErrorTransferCategories, string> = {
      InvalidCredentialsError: "INVALID_CREDENTIALS",
      UnauthorizedRoleError: "UNAUTHORIZED",
      SelfTransferError: "INVALID_AUTO_TRANSFER",
      InsufficientBalanceTransferError: "INSUFFICIENT_FUNDS_ERROR",
      default: "UNKNOWN_ERROR",
    }

    const errorName = error.constructor.name as ErrorTransferCategories

    return errorCodeMap[errorName] || errorCodeMap["default"]
  }
}
