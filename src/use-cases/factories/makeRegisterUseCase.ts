import { PrismaRegisterUserRepository } from "@/repositories/prisma/prisma-register-users-repository"
import { RegisterUserService } from "../user/register/register-user"

export default function makeRegisterUseCase() {
  const usersRepository = new PrismaRegisterUserRepository()
  const useCase = new RegisterUserService(usersRepository)

  return useCase
}