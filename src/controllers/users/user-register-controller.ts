import { userSchema } from "@/@types"
import { NotAllowedCpfDuplicated } from "@/use-cases/errors/cpf-already-used-error"
import makeRegisterUseCase from "@/use-cases/factories/makeRegisterUseCase"
import type { FastifyReply, FastifyRequest } from "fastify"

export default async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = userSchema.parse(request.body)

  const { full_name, cpf, email, password, role, total_balance, cnpj } = registerBodySchema

  try {
    const makeRegister = makeRegisterUseCase()

    await makeRegister.create({
      full_name: full_name,
      cpf: cpf,
      email: email,
      password: password,
      role: role,
      cnpj: cnpj,
      total_balance: total_balance,
    })
  } catch (error) {
    if (error instanceof NotAllowedCpfDuplicated) {
      reply.status(409).send(error.message)
    }

    reply.status(400).send({ message: "Request failed." })
  }

  return reply.status(201).send()
}
