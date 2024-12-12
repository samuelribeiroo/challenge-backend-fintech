import { AuthenticateUserRequest, IUser, AuthenticateUseCaseResponse } from "@/models/IUser"
import { IUserRepository } from "@/repositories/customer-repository"
import { compare } from "bcrypt"
import { InvalidCredentialsError } from "../../errors/invalid-credentials-error"

export class AuthenticateService {
  constructor(private readonly customerRepository: IUserRepository) {}

  async authenticate({ cpf, password }: AuthenticateUserRequest): Promise<AuthenticateUseCaseResponse> {
    const user = (await this.customerRepository.findByCpf(cpf)) as IUser

    if (!user) throw new InvalidCredentialsError()

    const passwordMatches = await compare(password, user.password)

    if (!passwordMatches) throw new InvalidCredentialsError()

    return { user: { id: String(user.id) } }
  }
}
