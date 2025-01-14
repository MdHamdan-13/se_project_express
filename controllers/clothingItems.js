const ClothingItem = require("../models/clothingItems");

const getClothingItem = (req, res) => {
  ClothingItem.find({})
    .then((items) => res.status(200).send(items))
    .catch((error) => {
      console.log(error);
      return res.status(500).send({ message: error.message });
    });
};

const createClothingItem = (req, res) => {};

const deleteClothingItem = (req, res) => {};

module.exports = { getClothingItem, createClothingItem, deleteClothingItem };
