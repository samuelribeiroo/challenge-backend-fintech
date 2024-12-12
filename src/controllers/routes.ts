import type { FastifyInstance, FastifyRequest, FastifyReply } from "fastify"
import authenticate from "./users/authenticate-user-controller"
import register from "./users/user-register-controller"


export default function userRoutes(app: FastifyInstance) {
  app.post("/register", register)
  app.post("/login", authenticate)
}