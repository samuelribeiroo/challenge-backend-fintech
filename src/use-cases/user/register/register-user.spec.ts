import { hash } from "bcrypt"
import { beforeEach, describe, expect, it, vitest } from "vitest"
import { IUser } from "../../../models/IUser"
import { InMemoryIUserRepository } from "../../../repositories/in-memory/in-memory-user-repository"
import { isValidCpf } from "../../../utils/validation"
import { RegisterUserService } from "./register-user"

let sut: RegisterUserService
let inMemory: InMemoryIUserRepository

describe("Use Case: Register User", () => {
  beforeEach(() => {
    inMemory = new InMemoryIUserRepository()
    sut = new RegisterUserService(inMemory)
    vitest.clearAllMocks()
  })

  it("should be possible register a new user.", async () => {
    const hashed = await hash("my$trongPassword1.67", 6)

    await sut.create({
      id: "user-id-01",
      full_name: "John Doe",
      cpf: "770.299.320-05",
      email: "johndoe@mail.com",
      password: hashed,
      role: "common",
      total_balance: 120,
    })

    const user = inMemory.items[0]

    expect(user.full_name).toEqual(expect.any(String))
    expect(user.total_balance).toEqual(expect.any(Number))
    expect(isValidCpf(user.cpf)).toBe(true)
  })

  it("should not be allowed creating a new user with the same CPF.", async () => {
    const data: IUser = {
      id: "user-id-01",
      full_name: "John Doe",
      cpf: "770.299.320-05",
      email: "johndoe@mail.com",
      password: "securePassword123",
      role: "common",
      total_balance: 100,
    }

    await sut.create(data)

    await expect(
      sut.create({
        ...data,
        id: "user-id-02",
        email: "johndoe2@mail.com",
      }),
    ).rejects.toThrowError("CPF is already in use.")
  })

  it("should throw an error if CPF format is invalid.", async () => {
    const hashed = await hash("my$trongPassword1.67", 6)

    await expect(
      sut.create({
        id: "user-id-02",
        full_name: "Jane Doe",
        cpf: "77029932005", // Invalid format.
        email: "janedoe@mail.com",
        password: hashed,
        role: "common",
        total_balance: 150,
      }),
    ).rejects.toThrowError()
  })

  it("should throw an error if CNPJ format is invalid.", async () => {
    const hashed = await hash("my$trongPassword1.67", 6)

    await expect(
      sut.create({
        id: "user-id-02",
        full_name: "Jane Doe",
        cpf: "3633l.2726", // Invalid format.
        email: "janedoe@mail.com",
        password: hashed,
        role: "store_owner",
        total_balance: 150,
      }),
    ).rejects.toThrowError()
  })
})
