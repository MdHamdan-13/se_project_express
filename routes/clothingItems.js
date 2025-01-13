const router = require("express").Router();

router.get("/", () => console.log("GET items"));
router.post("/", () => console.log("POST items by ID"));
router.delete("/:itemId", () => console.log("Delete items"));

module.exports = router;
