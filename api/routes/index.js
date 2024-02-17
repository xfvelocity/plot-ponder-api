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
const { searchUser, userProfile, userReviews } = require("../controllers/user");

router.get("/user-search", searchUser);

router.get("/user", userProfile);
router.get("/user/:username", userProfile);

router.get("/user-reviews", userReviews);
router.get("/user-reviews/:uuid", userReviews);

// ** Review **
const { postReview, getContentReviews } = require("../controllers/review");

router.post("/review", postReview);

router.get("/content/:id/reviews", getContentReviews);

module.exports = router;
