import { isValidCNPJ, isValidCpf } from "@/utils/validation"
import { z } from "zod"

const baseUserSchema = z.object({
  id: z.string().optional(),
  full_name: z.string().min(1, "Field is required"),
  cpf: z.string().refine(isValidCpf, { message: "Invalid CPF format." }),
  password: z.string().min(6, "Password must be at least 6 characters long."),
  email: z.string().email().min(1, "Field is required"),
  total_balance: z.number().min(1, "Total balance must be at least 0."),
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
