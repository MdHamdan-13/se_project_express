const router = require("express").Router();
const { getCurrentUser, updateUser } = require("../controllers/users");

// router.post("/", createUser);
// router.get("/", getUsers);
// router.get("/:userId", getUser); before step 7

router.get("/users/me", getCurrentUser);
router.patch("/users/me", updateUser);

module.exports = router;
