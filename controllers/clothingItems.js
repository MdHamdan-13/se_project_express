const ClothingItem = require("../models/clothingItems");
const { OK, CREATED } = require("../utils/errors/custom-error");
const { BadRequestError } = require("../utils/errors/bad-request-error");
const { ForbiddenError } = require("../utils/errors/forbidden-error");
const { NotFoundError } = require("../utils/errors/notfound-error");

const getClothingItem = (req, res, next) => {
  ClothingItem.find({})
    .then((item) => res.status(OK).send(item))
    .catch((error) => {
      console.error(error);
      // return res
      //   .status(SERVER_ERROR)
      //   .send({ message: "An error has occurred on the server" });
      next(error);
    });
};

const createClothingItem = (req, res, next) => {
  const { name, weather, imageUrl } = req.body;

  ClothingItem.create({ name, weather, imageUrl, owner: req.user._id })
    .then((item) => res.status(CREATED).send(item))
    .catch((error) => {
      console.error(error);
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

const deleteClothingItem = (req, res, next) => {
  const { itemId } = req.params;
  const itemOwner = req.user._id;

  ClothingItem.findById(itemId)
    .then((item) => {
      if (!item) {
        throw new Error("NotFound");
      }
      if (item.owner.toString() !== itemOwner) {
        throw new Error("Forbidden");
      }
      return ClothingItem.findByIdAndDelete(itemId);
    })
    .then((item) => res.status(OK).send(item))
    .catch((error) => {
      console.error(error);
      if (error.message === "NotFound") {
        // return res.status(NOT_FOUND).send({ message: error.message });
        next(new NotFoundError("Item not found"));
      }
      if (error.message === "Forbidden") {
        // return res.status(FORBIDDEN).send({ message: error.message });
        next(new ForbiddenError("Forbidden"));
      }
      if (error.name === "CastError") {
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

const likeItem = (req, res, next) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .orFail()
    .then((item) => res.status(OK).send(item))
    .catch((error) => {
      console.error(error);
      if (error.name === "CastError") {
        // return res.status(BAD_REQUEST).send({ message: error.message });
        next(new BadRequestError("Invalid User"));
      }
      if (error.name === "DocumentNotFoundError") {
        // return res.status(NOT_FOUND).send({ message: error.message });
        next(new NotFoundError("Item not found"));
      } else {
        // return res
        //   .status(SERVER_ERROR)
        //   .send({ message: "An error has occurred on the server" });
        next(error);
      }
    });
};

const dislikeItem = (req, res, next) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .orFail()
    .then((item) => res.status(OK).send(item))
    .catch((error) => {
      console.error(error);

      if (error.name === "CastError") {
        // return res.status(BAD_REQUEST).send({ message: error.message });
        next(new BadRequestError("Invalid User"));
      }
      if (error.name === "DocumentNotFoundError") {
        // return res.status(NOT_FOUND).send({ message: error.message });
        next(new NotFoundError("Item not found"));
      } else {
        // return res
        //   .status(SERVER_ERROR)
        //   .send({ message: "An error has occurred on the server" });
        next(error);
      }
    });
};

module.exports = {
  getClothingItem,
  createClothingItem,
  deleteClothingItem,
  likeItem,
  dislikeItem,
};
