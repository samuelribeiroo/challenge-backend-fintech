import { isValidCNPJ, isValidCpf } from "@/utils/validation"
import { Prisma } from "@prisma/client"
import { z } from "zod"

const baseUserSchema = z.object({
  id: z.string().optional(),
  full_name: z.string().min(1, "Field is required"),
  cpf: z.string().refine(isValidCpf, { message: "Invalid CPF format." }),
  password: z.string().min(6, "Password must be at least 6 characters long."),
  email: z.string().email().min(1, "Field is required"),
  total_balance: z.union([
    z.number().min(0, "Total balance must be at least 0."),
    z.string().transform(val => parseFloat(val)), 
    z.custom(val => val instanceof Prisma.Decimal, { message: "Invalid Decimal format" }), 
  ])
})

const storeOwnerSchema = baseUserSchema.extend({
  role: z.literal("store_owner"),
  cnpj: z.string().refine(isValidCNPJ, { message: "Invalid CNPJ format." }),
})

const commonUserSchema = baseUserSchema.extend({
  role: z.literal("common"),
  cnpj: z.string().optional(),
})

export const userSchema = z.discriminatedUnion("role", [storeOwnerSchema, commonUserSchema])

export const authenticateBodySchema = z.object({
  cpf: z.string(),
  password: z.string(),
})