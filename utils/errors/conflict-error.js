const customError = require("./custom-error");

class ConflictError extends customError {
  constructor(message = "Conflict") {
    super(message, 409);
  }
}

module.exports = ConflictError;
