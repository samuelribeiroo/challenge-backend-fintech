import isValidCpf from "@/utils/validate-cpf"
import { z } from "zod"

export const customerSchema = z.object({
  id: z.string().optional(),
  full_name: z.string().min(1, "Field is required"),
  cpf: z.string().refine(isValidCpf, { message: "Invalid CPF format." }),
  password: z.string().min(6, "Password must be at least 6 characters long."),
  email: z.string().email().min(1, "Field is required"),
  role: z.enum(["customer", "store_owner"]),
  total_balance: z.number().min(1, "Total balance must be at least 0."),
})
