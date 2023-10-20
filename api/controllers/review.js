const Review = require("../models/review");
const User = require("../models/user");

const postReview = async (req, res) => {
  try {
    const user = await User.findOne({ uuid: req.user.uuid });

    const { uuid, name, username, avatar } = user;

    const review = await Review.create({
      ...req.body,
      createdAt: new Date(),
      user: {
        uuid,
        name,
        username,
        avatar,
      },
    });

    return res.status(200).send(review);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

module.exports = {
  postReview,
};
