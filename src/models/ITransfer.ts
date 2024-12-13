export enum TransferStatus {
  PENDING = "PENDING",
  COMPLETED = "COMPLETED",
  FAIL = "FAIL",
}

export interface ITransfer {
  readonly id?: string
  readonly senderId: string
  readonly receiverId: string
  readonly value: number
  readonly createdAt?: Date
  status?: TransferStatus
}

export type Result<T> = {
  success: boolean
  data?: T
  error?: {
    code: string
    message: string
  }
}

export interface TransferServiceReponse {
  message: {
    status: string
    orderTime: Date
    transactionId?: string
  }
  success: boolean
}
