const express = require("express");
const router = express.Router();

// ** Auth **
const { registerUser, loginUser } = require("../controllers/auth");

router.post("/register", registerUser);

router.post("/login", loginUser);

// ** Feed **
const { getFeed } = require("../controllers/feed");

router.get("/feed", getFeed);

// ** User **
const { userProfile, userReviews } = require("../controllers/user");

router.get("/user", userProfile);
router.get("/user/:username", userProfile);

router.get("/user-reviews", userReviews);
router.get("/user-reviews/:uuid", userReviews);

// ** Review **
const { postReview } = require("../controllers/review");

router.post("/review", postReview);

// ** Content **
const { getContentReviews } = require("../controllers/review");

router.get("/content/:id/reviews", getContentReviews);

// ** Search **
const { searchUser } = require("../controllers/user");

router.get("/search/user", searchUser);

module.exports = router;
