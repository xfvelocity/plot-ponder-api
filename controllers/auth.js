const { hashPassword, comparePassword } = require("../helpers/auth");
const User = require("../models/user");

// ** Register **
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name) {
      return res.json({
        error: "Name is required",
      });
    }

    if (!password || password.length < 6) {
      return res.json({
        error: "Password should be at least 6 characters long",
      });
    }

    const emailExists = await User.findOne({ email });

    if (emailExists) {
      return res.json({
        error: "Email is already taken",
      });
    }

    const hashedPassword = await hashPassword(password);
    const user = await User.create({ name, email, password: hashedPassword });

    return res.json({ user });
  } catch (e) {
    console.log(e);
  }
};

// ** Login **
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.json({
        error: "No user found",
      });
    }

    const passwordMatch = await comparePassword(password, user.password);

    if (passwordMatch) {
      res.json("Logged in");
    } else {
      return res.json({
        error: "Invalid credentials",
      });
    }
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  registerUser,
  loginUser,
};
