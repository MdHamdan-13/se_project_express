const { customError } = require("./custom-error");

class ForbiddenError extends customError {
  constructor(message = "Forbidden") {
    super(message, 403);
  }
}

module.exports = ForbiddenError;
