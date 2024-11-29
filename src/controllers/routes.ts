import type { FastifyInstance } from "fastify"
import register from "./users/register/user-register-controller"

export default function userRoutes(app: FastifyInstance) {
  app.post("/register", register)
}
