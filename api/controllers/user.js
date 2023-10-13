const User = require("../models/user");
const Review = require("../models/review");

const searchUser = async (req, res) => {
  const searchTerm = req.query.q;

  if (searchTerm.length < 2) {
    res
      .status(500)
      .send({ message: "Search query must be at least 2 characters long" });
  } else {
    const user = await User.find({
      username: {
        $regex: new RegExp(searchTerm, "ig"),
      },
    }).then((r) =>
      r.map((x) => ({
        username: user.username,
        name: x.name,
        avatar: x.avatar,
      }))
    );

    res.send(user);
  }
};

const userProfile = async (req, res) => {
  const username = req.params.username || req.user.username;

  const user = await User.findOne({
    username,
  }).then((user) => {
    if (!user) {
      res.status(500).send({ message: "User not found" });
    } else {
      return {
        uuid: user.uuid,
        username: user.username,
        name: user.name,
        avatar: x.avatar,
      };
    }
  });

  res.send(user);
};

const userReviews = async (req, res) => {
  const uuid = req.params.uuid || req.user.uuid;

  const reviews = await Review.find({ userUuid: uuid });

  res.send(reviews);
};

module.exports = {
  searchUser,
  userProfile,
  userReviews,
};
