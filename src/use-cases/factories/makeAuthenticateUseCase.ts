import { PrismaUserRepository } from "@/repositories/prisma/prisma-users-repository"
import { AuthenticateService } from "../user/authentication/authenticate"

export default function makeAuthenticateUser() {
  const usersRepository = new PrismaUserRepository()
  const useCase = new AuthenticateService(usersRepository)

  return useCase
}
