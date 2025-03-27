const { customError } = require("./custom-error");

class BadRequestError extends customError {
  constructor(message = "Bad Request") {
    super(message, 400);
  }
}

module.exports = BadRequestError;
