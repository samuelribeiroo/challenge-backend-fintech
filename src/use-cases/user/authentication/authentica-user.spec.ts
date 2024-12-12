import { beforeEach, describe, expect, it, vi, vitest } from "vitest"
import { InMemoryIUserRepository } from "../../../repositories/in-memory/in-memory-user-repository"
import { AuthenticateService } from "./authenticate"
import { hash } from "bcrypt"
import authenticate from "../../../controllers/users/authenticate-user-controller"
import makeAuthenticateUseCase from "../../factories/makeAuthenticateUseCase"
import { FastifyReply, FastifyRequest } from "fastify"

let sut: AuthenticateService
let inMemory: InMemoryIUserRepository

describe("Use Case: Authenticate", () => {
  beforeEach(() => {
    inMemory = new InMemoryIUserRepository()
    sut = new AuthenticateService(inMemory)
    vitest.clearAllMocks()
  })

  it("should be possible authenticate on application", async () => {
    const plainTextPassword = await hash("my$trongPassword1.67", 6)
    const hashed = await hash(plainTextPassword, 6)

    const user = await inMemory.create({
      id: "user-id-01",
      full_name: "John Doe",
      cpf: "454.746.460-03",
      email: "johndoe@mail.com",
      password: hashed,
      role: "common",
      total_balance: 120,
    })

    const authenticate = sut.authenticate({
      cpf: user.cpf,
      password: plainTextPassword,
    })

    // Here we not care about values that is passed, but specifically with return. In this case, if return is truthy.
    expect(authenticate).toBeTruthy()
  })
})