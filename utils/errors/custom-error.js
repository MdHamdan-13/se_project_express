const OK = 200;
const CREATED = 201;
const SERVER_ERROR = 500;

class customError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

module.exports = {
  OK,
  CREATED,
  SERVER_ERROR,
  customError,
};
