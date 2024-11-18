export function isValidCpf(cpf: string): boolean {
  const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/

  return cpfRegex.test(cpf)
}

export function isValidCNPJ(cnpj: string): boolean {
  const cnpjRegex = /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/

  return cnpjRegex.test(cnpj)
}