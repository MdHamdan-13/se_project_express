const router = require("express").Router();
const { NOT_FOUND } = require("../utils/errors");

const userRouter = require("./users");
const clothingRouter = require("./clothingItems");

router.use("/users", userRouter);
router.use("/items", clothingRouter);

router.use((req, res) => {
  res.status(NOT_FOUND).send({ message: error.message });
});

module.exports = router;
