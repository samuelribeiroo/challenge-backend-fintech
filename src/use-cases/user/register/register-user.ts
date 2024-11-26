import { userSchema } from "@/@types"
import { IUser, UserResponse } from "@/models/IUser"
import { NotAllowedCpfDuplicated } from "@/use-cases/errors/cpf-already-used-error"
import { isValidCpf } from "@/utils/validation"
import { hash } from "bcrypt"
import { IUserRepository } from "../../../repositories/customer-repository"

// @ts-ignore -> The 'findCpf' method implementation is not necessary here. So the solution that I find to stop the error it's ignore it.
export class RegisterUserService  {
  constructor(private readonly customerService: IUserRepository) {}

 
  async create(data: IUser): Promise<UserResponse> {
    const processData = userSchema.parse(data)

    const { id, full_name, cpf, email, password, role, total_balance } = processData

    const hashedPassword = await hash(password, 6)

    if (!isValidCpf(cpf)) throw new Error("Inserted CPF format is not valid.")

    const isUniqueCPF = await this.customerService.findCpf(cpf)

    if (isUniqueCPF) throw new NotAllowedCpfDuplicated()

    await this.customerService.create({
      id,
      full_name,
      cpf,
      email,
      password: hashedPassword,
      total_balance: +total_balance,
      role,
    })

    const userCreationHandler: UserResponse = {
      role: role,
      full_name: full_name,
    }

    return userCreationHandler
  }
}
