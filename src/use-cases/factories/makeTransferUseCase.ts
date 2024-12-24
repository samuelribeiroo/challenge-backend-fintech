import { InMemoryTransferRepository } from "@/repositories/in-memory/in-memory-transfer-repository"
import { TransferRepository, TransferService } from "../transfer/transfer"
import { MockUserRepository } from "@/test"

export default function makeTransferUseCase() {
  const userRepository = new MockUserRepository() // Aqui vai ser o prisma
  const transferStorage = new InMemoryTransferRepository()
  const transferRepository = new TransferRepository(userRepository, transferStorage)
  const transferService = new TransferService(userRepository, transferRepository)

  return transferService
} 