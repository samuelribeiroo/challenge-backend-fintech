import { Prisma } from "@prisma/client"

export function isValidCPF(cpf: string): boolean {
  const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/

  return cpfRegex.test(cpf)
}

export function isValidCNPJ(cnpj: string): boolean {
  const cnpjRegex = /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/

  return cnpjRegex.test(cnpj)
}

export function normalizeBalanceType(value: any): Prisma.Decimal {
  try {
    // If the input matching with type Prisma.Decimal we keep the value.
    return value instanceof Prisma.Decimal ? value : new Prisma.Decimal(value ?? 0) // If data is undefined or null, 0 will applied here.
  } catch (error) {
    throw new Error(`Invalid balance: ${value}`)
  }
}
