const router = require("express").Router();
const auth = require("../middlewares/auth");
const { validateClothingItem } = require("../middlewares/validation");
const {
  getClothingItem,
  createClothingItem,
  deleteClothingItem,
  likeItem,
  dislikeItem,
} = require("../controllers/clothingItems");

router.get("/", getClothingItem);

router.use(auth);

// Protected routes - recenyly added validation
router.post("/", validateClothingItem, createClothingItem);
router.delete("/:itemId", validateClothingItem, deleteClothingItem);
router.put("/:itemId/likes", validateClothingItem, likeItem);
router.delete("/:itemId/likes", validateClothingItem, dislikeItem);

module.exports = router;
