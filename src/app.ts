import { fastify } from "fastify"
import { ZodError } from "zod"
import { env } from "./env"

export const app = fastify()

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    reply.status(400).send({ message: "Erron while validating data.", issue: error.format() })
  }

  if (env.NODE_ENV !== "prod") {
    console.log(error)
  } else {
    // For the future whether be a prerequisite we can implement a external service to create a  monitoring Tool, like Sentry/Relic..
  }

  if (error.statusCode === 429) {
    return reply.status(429).send({ message: error.stack })
  }

  reply.status(500).send({ message: "Internal server error" })
})
