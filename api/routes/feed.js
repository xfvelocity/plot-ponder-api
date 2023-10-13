const express = require("express");
const router = express.Router();
const { getFeed } = require("../controllers/feed");

router.get("/feed", getFeed);

module.exports = router;
