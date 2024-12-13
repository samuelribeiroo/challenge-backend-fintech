import { TransferStatus } from "@/models/ITransfer"
import { ITransfer, TransferStorage  } from "../transfer-repository"
import { v4 as uuidv4 } from "uuid"

export class InMemoryTransferRepository implements TransferStorage {
  constructor(private transferRepository: ITransfer[] = []) {}

  async save(transfer: ITransfer): Promise<ITransfer> {
    const newTransfer: ITransfer = {
      ...transfer,
      id: uuidv4(),
      status: TransferStatus.COMPLETED,
      createdAt: new Date()
    }

    this.transferRepository.push(newTransfer)
    
    return newTransfer
  }

  async findByUserId(userId: string): Promise<ITransfer[]> {
    return this.transferRepository.filter(user => 
      user.senderId === userId || 
      user.receiverId === user.receiverId)
  }
}

