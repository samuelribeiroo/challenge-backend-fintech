import { prisma } from "@/lib/prisma"
import { AuthenticateUserResponse, UserResponse } from "@/models/IUser"
import { Prisma } from "@prisma/client"
import { IUserRepository } from "../customer-repository"

export class PrismaUserRepository implements IUserRepository {
 
  async create(data: Prisma.UserAppCreateInput): Promise<UserResponse> {
    const user = await prisma.userApp.create({
      data,
    })

    return {
      full_name: user.full_name,
      role: user.role
    }
  }

  async findByCpf(cpf: string): Promise<AuthenticateUserResponse | null> {
    const user = await prisma.userApp.findUnique({
      where: { cpf },
    })

    if (!user) return null

    return {
      full_name: user.full_name,
      role: user.role,
      password: user.password,
      id: user.id
    }
  }
}

