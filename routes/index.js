const router = require("express").Router();
const { NotFoundError } = require("../utils/errors/notfound-error");
const userRouter = require("./users");
const clothingRouter = require("./clothingItems");
const { login, createUser } = require("../controllers/users");
const {
  validateUserInfo,
  validateUserLogin,
} = require("../middlewares/validation");

const auth = require("../middlewares/auth");

router.post("/signup", validateUserInfo, createUser);
router.post("/signin", validateUserLogin, login);

router.use("/users", auth, userRouter);
router.use("/items", clothingRouter);

router.use((req, res, next) => {
  next(new NotFoundError("Route Not Found"));
});

module.exports = router;
