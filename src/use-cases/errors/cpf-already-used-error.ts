export class NotAllowedCpfDuplicated extends Error {
  constructor() {
    super('CPF is already in use.')
  }
}