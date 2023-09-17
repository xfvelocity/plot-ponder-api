const { hashPassword, comparePassword } = require("../helpers/auth");
const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");
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
    const user = await User.create({
      uuid: uuidv4(),
      name,
      email,
      password: hashedPassword,
    });

    const accessToken = jwt.sign(user.toJSON(), process.env.JWT_SECRET);

    return res.status(200).send({
      name: user.name,
      email: user.email,
      uuid: user.uuid,
      accessToken,
    });
  } catch (e) {
    res.status(500).send(e);
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
      const accessToken = jwt.sign(user.toJSON(), process.env.JWT_SECRET);

      res.status(200).send({
        name: user.name,
        email: user.email,
        uuid: user.uuid,
        accessToken,
      });
    } else {
      return res.status(500).send("Invalid credentials");
    }
  } catch (e) {
    res.status(500).send(e);
  }
};

module.exports = {
  registerUser,
  loginUser,
};
