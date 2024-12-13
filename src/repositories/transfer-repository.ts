import { TransferStatus } from "@/models/ITransfer"

export interface ITransferRepository {
  validateTransferRules(transfer: Omit<ITransfer, "id">): Promise<boolean>
  create(transfer: ITransfer): Promise<ITransfer>
}

export interface ITransfer {
  readonly id?: string
  readonly senderId: string
  readonly receiverId: string
  readonly value: number
  readonly status?: TransferStatus
  readonly createdAt?: Date
}

export interface TransferStorage {
  save(transfer: ITransfer): Promise<ITransfer>
  findByUserId(userId: string): Promise<ITransfer[]>
}
