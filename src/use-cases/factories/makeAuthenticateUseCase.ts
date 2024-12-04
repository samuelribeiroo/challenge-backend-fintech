import { PrismaRegisterUserRepository } from "@/repositories/prisma/prisma-register-users-repository"
import { AuthenticateUseCase } from "../user/authentication/authenticate"

export default function makeAuthenticateUser() {
  const usersRepository = new PrismaRegisterUserRepository()
  const useCase = new AuthenticateUseCase(usersRepository)

  return useCase
}