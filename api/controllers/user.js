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
        avatar: user.avatar,
      };
    }
  });

  res.send(user);
};

const userReviews = async (req, res) => {
  const uuid = req.params.uuid || req.user.uuid;
  const page = parseInt(req.query.page || "") || 1;
  const perPage = parseInt(req.query.perPage || "") || 10;
  const query = {
    "user.uuid": uuid,
  };

  try {
    const total = await Review.countDocuments(query);

    const reviews = await Review.find(query)
      .sort({ date: -1 })
      .skip((page - 1) * perPage)
      .limit(perPage);

    res.json({
      data: reviews,
      meta: {
        page,
        perPage,
        totalPages: Math.ceil(total / perPage),
        total,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

module.exports = {
  searchUser,
  userProfile,
  userReviews,
};
