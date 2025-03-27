const { customError } = require("./custom-error");

class NotFoundError extends customError {
  constructor(message = "Not Found") {
    super(message, 404);
  }
}

module.exports = NotFoundError;
