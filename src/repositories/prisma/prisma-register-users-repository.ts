import { prisma } from "@/lib/prisma"
import { UserResponse } from "@/models/IUser"
import { Prisma } from "@prisma/client"
import { IUserRepository } from "../customer-repository"

export class PrismaRegisterUserRepository implements IUserRepository {
 
  async create(data: Prisma.UserAppCreateInput): Promise<UserResponse> {
    const user = await prisma.userApp.create({
      data,
    })

    return {
      full_name: user.full_name,
      role: user.role
    }
  }

  async findCpf(cpf: string): Promise<UserResponse | null> {
    const user = await prisma.userApp.findUnique({
      where: { cpf },
    })

    if (!user) return null

    return {
      full_name: user.full_name,
      role: user.role
    }
  }
}

