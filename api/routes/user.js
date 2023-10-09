const express = require("express");
const router = express.Router();

const { searchUser, userProfile } = require("../controllers/user");

router.get("/user/search", searchUser);

router.get("/user", userProfile);
router.get("/user/:uuid", userProfile);

module.exports = router;
