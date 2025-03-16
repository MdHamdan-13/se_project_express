const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { JWT_SECRET } = require("../utils/config");
const {
  OK,
  BadRequestError,
  UnauthorizedError,
  NotFoundError,
  ConflictError,
  SERVER_ERROR,
} = require("../utils/errors");

const getCurrentUser = (req, res, next) => {
  const userId = req.user._id;
  User.findById(userId)
    .orFail()
    .then((user) => res.status(OK).send(user))
    .catch((error) => {
      console.error(error);
      console.log(error.name);
      if (error.name === "CastError") {
        // return res.status(BAD_REQUEST).send({ message: error.message });
        next(new BadRequestError("Invalid User"));
      }
      if (error.name === "DocumentNotFoundError") {
        // return res.status(NOT_FOUND).send({ message: error.message });
        next(new NotFoundError("User not found"));
      }
      if (error.name === "ValidationError") {
        // return res.status(BAD_REQUEST).send({ message: error.message });
        next(new BadRequestError(error.message));
      } else {
        // return res
        //   .status(SERVER_ERROR)
        //   .send({ message: "An error has occurred on the server" });
        next(error);
      }
    });
};

const createUser = (req, res, next) => {
  const { name, avatar, email, password } = req.body;

  User.findOne({ email })
    .select("+password")
    .then((existingUser) => {
      if (existingUser) {
        const error = new Error("User already exists");
        error.name = "DuplicationError";
        error.code = 11000;
        throw error;
      }
      return bcrypt.hash(password, 10);
    })
    .then((hash) => User.create({ name, avatar, email, password: hash }))
    .then((user) => {
      const userCopy = user.toObject();
      delete userCopy.password;
      res.status(OK).send({ user: userCopy });
    })
    .catch((error) => {
      console.error(error);
      console.log(error.name);

      if (error.name === "ValidationError") {
        // return res.status(BAD_REQUEST).send({ message: error.message });
        next(new BadRequestError("Invalid User"));
      }
      if (error.code === 11000) {
        return res
          .status(ConflictError)
          .send({ message: "Email already exists" });
      } else {
        // return res
        //   .status(SERVER_ERROR)
        //   .send({ message: "An error has occurred on the server" });
        next(error);
      }
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(BadRequestError)
      .send({ message: "Email and password required" });
  }

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });
      return res.status(OK).send({ token }); // prev .json
    })
    .catch((error) => {
      console.error(error);
      console.log(error.name);
      if (error.message === "Incorrect email or password") {
        // return res.status(UNAUTH_ERROR).send({ message: error.message });
        next(new UnauthorizedError("Incorrect email or password"));
      } else {
        // return res
        //   .status(SERVER_ERROR)
        //   .send({ message: "An error has occurred on the server" });
        next(error);
      }
    });
};

const updateUser = (req, res, next) => {
  const { name, avatar } = req.body;
  const userId = req.user._id;

  User.findByIdAndUpdate(
    userId,
    { name, avatar },
    { new: true, runValidators: true }
  )
    .then((updatedUser) => {
      if (!updatedUser) {
        // return res.status(NOT_FOUND).send({ message: "User not Found" });
        next(new NotFoundError("User not found"));
      }
      return res.status(OK).send(updatedUser);
    })
    .catch((error) => {
      console.error(error);
      console.log(error.name);
      if (error.name === "ValidationError") {
        // return res.status(BAD_REQUEST).send({ message: error.message });
        next(new BadRequestError("Invalid User"));
      } else {
        // return res
        //   .status(SERVER_ERROR)
        //   .send({ message: "An error has occurred on the server" });
        next(error);
      }
    });
};

module.exports = { getCurrentUser, createUser, login, updateUser };
