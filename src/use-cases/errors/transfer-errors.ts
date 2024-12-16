 class InsufficientBalanceTransferError extends Error {
  constructor() {
    super("Saldo insuficiente para transferência")
    this.name = "InsufficientBalanceTransferError"
    Object.freeze(this)
  }
}

class SelfTransferError extends Error {
  constructor() {
    super("You cant transfer values to yourself")
    this.name = "SelfTransferError"
    Object.freeze(this)
  }
}

class UnauthorizedRoleError extends Error {
  constructor() {
    super("You role is not authorized to make transfer")
    this.name = "UnauthorizedRoleError"
    Object.freeze(this)
  }
}

export { InsufficientBalanceTransferError, SelfTransferError, UnauthorizedRoleError }