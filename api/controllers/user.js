const User = require("../models/user");

const searchUser = async (req, res) => {
  const searchTerm = req.query.q;

  if (searchTerm.length < 2) {
    res.status(500).send("Search query must be at least 2 characters long");
  } else {
    const user = await User.find({
      username: {
        $regex: new RegExp(searchTerm, "ig"),
      },
    }).then((r) =>
      r.map((x) => ({
        username: user.username,
        name: x.name,
      }))
    );

    res.send(user);
  }
};

const userProfile = async (req, res) => {
  const uuid = req.params.uuid || req.user.uuid;

  const user = await User.findOne({
    uuid,
  }).then((user) => {
    if (!user) {
      res.status(500).send("User not found");
    } else {
      return {
        username: user.username,
        name: user.name,
      };
    }
  });

  res.send(user);
};

module.exports = {
  searchUser,
  userProfile,
};
