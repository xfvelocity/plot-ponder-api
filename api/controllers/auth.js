const { hashPassword, comparePassword } = require("../helpers/generic");
const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");
const { User } = require("../models/index");

// ** Register **
const registerUser = async (req, res) => {
  try {
    const { name, email, password, username } = req.body;

    if (!name) {
      return res.status(500).send({ message: "Name is required" });
    }

    if (!username) {
      return res.status(500).send({ message: "Username is required" });
    } else {
      const matchingUser = await User.findOne({ username });

      if (matchingUser) {
        return res.status(500).send({ message: "Username is taken" });
      }
    }

    const passwordRegex = new RegExp("^(?=.*[A-Za-z])(?=.*d)[A-Za-zd]{6,}$");

    if (passwordRegex.test(password)) {
      return res
        .status(500)
        .send({ message: "Password must include 6 characters and 1 number" });
    }

    if (password)
      if (!email) {
        return res.status(500).send({ message: "Email is required" });
      } else {
        const emailExists = await User.findOne({ email });

        if (emailExists) {
          return res.status(500).send({ message: "Email is already taken" });
        }
      }

    const hashedPassword = await hashPassword(password);
    const user = await User.create({
      uuid: uuidv4(),
      name,
      username,
      email,
      password: hashedPassword,
      avatar: "",
    });

    const accessToken = jwt.sign(user.toJSON(), process.env.JWT_SECRET);

    return res.status(200).send({
      name: user.name,
      username: user.username,
      email: user.email,
      uuid: user.uuid,
      avatar: user.avatar,
      accessToken,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

// ** Login **
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(500).send({ message: "Incorrect email or password" });
    }

    const passwordMatch = await comparePassword(password, user.password);

    if (passwordMatch) {
      const accessToken = jwt.sign(user.toJSON(), process.env.JWT_SECRET);

      res.status(200).send({
        name: user.name,
        email: user.email,
        username: user.username,
        uuid: user.uuid,
        avatar: user.avatar,
        accessToken,
      });
    } else {
      return res.status(500).send({ message: "Incorrect email or password" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

module.exports = {
  registerUser,
  loginUser,
};
