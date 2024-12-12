import { NoTokenProvidedError } from '@/use-cases/errors/no-token-provided-error'
import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify'
import fp from 'fastify-plugin'

interface AuthenticatePluginOptions {
  customErrorMessage?: string
}

export default fp((app: FastifyInstance, opts: AuthenticatePluginOptions) => {
  app.decorate('authenticate', async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const token = request.headers.authorization?.replace('Bearer ', '')

      if (!token) throw new NoTokenProvidedError()

      await request.jwtVerify()
    } catch (error) {
      if (error instanceof NoTokenProvidedError) reply.status(401).send({ message: error.message || opts.customErrorMessage }) 

      return reply.status(500).send({ message: 'Internal Server Error' })
    }
  })
})

declare module "fastify" {
  interface FastifyInstance {
    authenticate: (request: FastifyRequest, reply: FastifyReply) => Promise<void>;
  }
}