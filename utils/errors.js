const OK = 200;
const CREATED = 201;
const BAD_REQUEST = 400;
const UNAUTH_ERROR = 401;
const FORBIDDEN = 403;
const NOT_FOUND = 404;
const CONFLICT_ERROR = 409;
const SERVER_ERROR = 500;

class customError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

class BadRequestError extends customError {
  constructor(message = "Bad Request") {
    super(message, BAD_REQUEST);
  }
}

class UnauthorizedError extends customError {
  constructor(message = "Unauthorized") {
    super(message, UNAUTH_ERROR);
  }
}

class ForbiddenError extends customError {
  constructor(message = "Forbidden") {
    super(message, FORBIDDEN);
  }
}

class NotFoundError extends customError {
  constructor(message = "Not Found") {
    super(message, NOT_FOUND);
  }
}

class ConflictError extends customError {
  constructor(message = "Conflict") {
    super(message, CONFLICT_ERROR);
  }
}

module.exports = {
  OK,
  CREATED,
  BadRequestError,
  UnauthorizedError,
  ForbiddenError,
  NotFoundError,
  ConflictError,
  SERVER_ERROR,
};
