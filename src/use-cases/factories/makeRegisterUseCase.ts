import { PrismaUserRepository } from "@/repositories/prisma/prisma-users-repository"
import { RegisterUserService } from "../user/register/register-user"

export default function makeRegisterUseCase() {
  const usersRepository = new PrismaUserRepository()
  const useCase = new RegisterUserService(usersRepository)

  return useCase
}
