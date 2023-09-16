const express = require("express");
const router = express.Router();
const cors = require("cors");

const { registerUser, loginUser } = require("../controllers/auth");

// ** Middleware **
router.use(
  cors({
    credentials: true,
    origin: ["http://localhost:5173"],
  })
);

// ** Routes **
router.post("/register", registerUser);

router.post("/login", loginUser);

module.exports = router;
