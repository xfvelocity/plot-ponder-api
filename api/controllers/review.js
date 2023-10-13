const Review = require("../models/review");
const User = require("../models/user");

const postReview = async (req, res) => {
  try {
    const user = await User.findOne({ uuid: req.user.uuid });

    const { uuid, name, username, avatar } = user;

    const review = await Review.create({
      ...req.body,
      user: {
        uuid,
        name,
        username,
        avatar,
      },
    });

    return res.status(200).send(review);
  } catch (e) {
    res.status(500).send(e);
  }
};

module.exports = {
  postReview,
};
