const User = require("../models/user");

const searchUser = async (req, res) => {
  if (req.query.search.length < 2) {
    res.status(500).send("Search query must be at least 2 characters long");
  } else {
    const user = await User.find({
      name: {
        $regex: new RegExp(req.query.search, "ig"),
      },
    }).then((r) =>
      r.map((x) => ({
        uuid: x.uuid,
        name: x.name,
      }))
    );

    res.send(user);
  }
};

module.exports = {
  searchUser,
};
