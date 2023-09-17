const express = require("express");
const router = express.Router();
const { postReview } = require("../controllers/review");

router.post("/review", postReview);

module.exports = router;
