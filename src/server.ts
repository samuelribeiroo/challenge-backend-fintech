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
})

app
  .listen({
    host: "0.0.0.0",
    port: env.PORT,
  })
  .then(() => console.log(`Server is running at: http://localhost:${env.PORT}`))
