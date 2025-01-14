const router = require("express").Router();
const {
  getClothingItem,
  createClothingItem,
  deleteClothingItem,
} = require("../controllers/clothingItems");

router.get("/", getClothingItem);
router.post("/", () => console.log("POST items by ID"));
router.delete("/:itemId", () => console.log("Delete items"));

module.exports = router;
