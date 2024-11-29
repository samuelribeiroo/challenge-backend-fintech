import { fastify } from "fastify"
import { ZodError } from "zod"
import { env } from "./env"
import userRoutes from "./controllers/routes"

export const app = fastify()

app.register(userRoutes)

// Global Error handler based on zod validation schema.

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    reply.status(400).send({ message: "Erron while validating data.", issue: error.format() })
  }

  env.NODE_ENV !== "prod" ? console.log(error) : null

  // For the future in some case whether be a prerequisite we can implement a external service to create a  monitoring tool, like Sentry/Relic/Data Dog..
 
  if (error.statusCode === 429) {
    return reply.status(429).send({ message: error.stack })
  }

  reply.status(500).send({ message: "Internal server error" })
})
