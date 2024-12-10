// import makeRegisterUseCase from "@/use-cases/factories/makeRegisterUseCase"
// import { Prisma } from "@prisma/client"

// async function createUser() {
//   const registerUseCase = makeRegisterUseCase()

//   const newUser: Prisma.UserAppCreateInput = {
//     full_name: "João da Silva",
//     email: "joao.silva2@example.com",
//     password: "senhaSegura123",
//     cpf: "001.794.219-98",
//     cnpj: "",
//     role: "common",
//     total_balance: '10000',
//   }

//   try {
//     const user = await registerUseCase.create(newUser)
//     console.log("Usuário criado com sucesso:", user)
//   } catch (error) {
//     console.error("Erro ao criar usuário:", error)
//   }
// }

// createUser()

export function isValidCNPJ(cnpj: string): boolean {
  const cnpjRegex = /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/

  return cnpjRegex.test(cnpj)
}

const result = isValidCNPJ("66.859.468/0001-44")

console.log(result)
