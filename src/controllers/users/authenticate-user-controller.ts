import { authenticateBodySchema } from "@/@types"
import { InvalidCredentialsError } from "@/use-cases/errors/invalid-credentials-error"
import makeAuthenticateUser from "@/use-cases/factories/makeAuthenticateUseCase"
import { FastifyReply, FastifyRequest } from "fastify"

export default async function authenticate(request: FastifyRequest, reply: FastifyReply) {
  const { cpf, password } = authenticateBodySchema.parse(request.body)

  try {
    const authenticateUseCase = makeAuthenticateUser()

    const { user } = await authenticateUseCase.authenticate({ cpf, password })

    const token = request.server.jwt.sign({ id: user.id })

    return reply.status(200).send({ message: token })
  } catch (error) {
    if (error instanceof InvalidCredentialsError) reply.status(400).send({ message: error.message })

    return reply.status(500).send({ message: '"Internal Server Error."' })
  }
}
