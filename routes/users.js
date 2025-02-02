const router = require("express").Router();
const {
  getUsers,
  getCurrentUser,
  createUser,
} = require("../controllers/users");

// router.post("/", createUser);
// router.get("/", getUsers);
// router.get("/:userId", getUser); before step 7
router.get("/users/me", getCurrentUser);

module.exports = router;
