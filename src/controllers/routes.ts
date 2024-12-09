import type { FastifyInstance } from "fastify"
import authenticate from "./users/register/authenticate-user-controller"
import register from "./users/register/user-register-controller"

export default function userRoutes(app: FastifyInstance) {
  app.post("/register", register)
  app.post("/login", authenticate)
}
