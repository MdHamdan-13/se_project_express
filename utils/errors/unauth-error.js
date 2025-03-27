const { customError } = require("./custom-error");

class UnauthorizedError extends customError {
  constructor(message = "Unauthorized") {
    super(message, 401);
  }
}

module.exports = UnauthorizedError;
