import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify"

export default function authenticatePlugin(app: FastifyInstance) {
  app.decorate("authenticate", async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      await request.jwtVerify()
    } catch (error) {
      return reply.status(401).send({ message: "Unauthorized" })
    }
  })
}

declare module "fastify" {
  interface FastifyInstance { authenticate: any }
}
