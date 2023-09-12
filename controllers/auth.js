const { hashPassword, comparePassword } = require("../helpers/auth");
const User = require("../models/user");

// ** Register **
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name) {
      return res.status(500).send("Name is required");
    }

    if (!password || password.length < 6) {
      return res
        .status(500)
        .send("Password should be at least 6 characters long");
    }

    const emailExists = await User.findOne({ email });

    if (emailExists) {
      return res.status(500).send("Email is already taken");
    }

    const hashedPassword = await hashPassword(password);
    const user = await User.create({ name, email, password: hashedPassword });

    return res.status(200).send({
      name: user.name,
      email: user.email,
      uuid: user._id,
    });
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
      return res.status(500).send("No user found");
    }

    const passwordMatch = await comparePassword(password, user.password);

    if (passwordMatch) {
      res.status(200).send({
        name: user.name,
        email: user.email,
        uuid: user._id,
      });
    } else {
      return res.status(500).send("Invalid credentials");
    }
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  registerUser,
  loginUser,
};
