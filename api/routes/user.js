const express = require("express");
const router = express.Router();

const { searchUser, userProfile, userReviews } = require("../controllers/user");

router.get("/user-search", searchUser);

router.get("/user", userProfile);
router.get("/user/:username", userProfile);

router.get("/user-reviews", userReviews);
router.get("/user-reviews/:uuid", userReviews);

module.exports = router;
