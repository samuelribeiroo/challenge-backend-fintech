import { IUser, UserResponse } from "../../models/IUser"
import { isValidCpf } from "../../utils/validation"
import { IUserRepository } from "../customer-repository"

export class InMemoryIUserRepository implements IUserRepository {
  public items: IUser[] = []

  async create(data: IUser): Promise<UserResponse | any> {
    const { id, full_name, cpf, email, password, role, total_balance } = data

    if (!isValidCpf(cpf)) throw new Error("Inserted CPF format is not valid.")
    
    const customer: IUser = {
      id,
      full_name,
      cpf,
      email,
      password,
      role,
      total_balance,
    }

    this.items.push(customer)

    return Promise.resolve(customer)
  }

  async findByCpf(cpf: string): Promise<UserResponse | null> {
    return this.items.find(item => item.cpf === cpf) || null
  }
}
