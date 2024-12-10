import { IUser, UserResponse } from "@/models/IUser"

export interface IUserRepository {
  create(data: IUser): Promise<UserResponse>
  findByCpf(cpf: string): Promise<UserResponse | null>
}
