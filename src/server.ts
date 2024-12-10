import { env } from "@/env"
import { fastifyCors } from "@fastify/cors"
import { fastifyRateLimit } from "@fastify/rate-limit"
import { app } from "./app"

app.register(fastifyCors, {
  origin: env.NODE_ENV,
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
})

app.register(fastifyRateLimit, {
  max: 100,
  timeWindow: "1 minute",
  errorResponseBuilder: (_, context) => {
    return {
      statusCode: 429,
      error: "Too many requests in 1 minute",
      message: `You have been exceeded ${context.max} request in ${context.after}`,
    }
  },
})

app
  .listen({
    host: "0.0.0.0",
    port: env.PORT,
  })
  .then(() => console.log(`Server is running at: http://localhost:${env.PORT}`))
