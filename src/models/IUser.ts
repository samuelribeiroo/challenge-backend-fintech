import { Roles, Prisma } from "@prisma/client"
import { DecimalJsLike } from "@prisma/client/runtime/library"

export interface IUser {
  readonly id?: string
  readonly role: Roles
  readonly full_name: string
  readonly cpf: string
  readonly cnpj?: string | null | undefined
  readonly email: string
  readonly password: string
  readonly total_balance: string | number | Prisma.Decimal | DecimalJsLike
}

export type UserResponse = Omit<IUser, "password" | "balance" | "cpf" | "cnpj" | "id" | "email" | "total_balance">

export type AuthenticateUserResponse = Omit<IUser, | "balance" | "cpf" | "cnpj" | "email" | "total_balance">

export interface AuthenticateUserRequest {
  cpf: string
  password: string
}

export interface AuthenticateUseCaseResponse {
  user: {
    id: string
  }
}
