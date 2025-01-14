const ClothingItem = require("../models/clothingItems");

const getClothingItem = (req, res) => {
  ClothingItem.find({})
    .then((item) => res.status(200).send(item))
    .catch((error) => {
      console.log(error);
      return res.status(500).send({ message: error.message });
    });
};

const createClothingItem = (req, res) => {
  const { name, weather, imageUrl } = req.body;

  ClothingItem.create({ name, weather, imageUrl })
    .then((item) => res.status(201).send(item))
    .catch((error) => {
      console.log(error);
      if (error.name === "ValidationError") {
        return res.status(400).send({ message: error.message });
      }
      return res.status(500).send({ message: error.message });
    });
};

const deleteClothingItem = (req, res) => {
  const { itemId } = req.params;

  ClothingItem.findByIdAndDelete(itemId)
    .orFail()
    .then((item) => res.status(204).send({}))
    .catch((error) => {
      console.log(error);
      return res.status(500).send({ message: error.message });
    });
};

module.exports = { getClothingItem, createClothingItem, deleteClothingItem };
