 class InsufficientBalanceTransferError extends Error {
  constructor() {
    super("Saldo insuficiente para transferência")
    Object.freeze(this)
  }
}

class SelfTransferError extends Error {
  constructor() {
    super("You cant transfer values to yourself")
    Object.freeze(this)
  }
}

class UnauthorizedRoleError extends Error {
  constructor() {
    super("You role is not authorized to make transfer")
    Object.freeze(this)
  }
}

export { InsufficientBalanceTransferError, SelfTransferError, UnauthorizedRoleError }