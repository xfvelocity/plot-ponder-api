const { User } = require("../models/index");
const { getReviewData, paginatedList } = require("../helpers/generic");

const searchUser = async (req, res) => {
  const searchTerm = req.query.q;

  if (searchTerm.length < 2) {
    res
      .status(500)
      .send({ message: "Search query must be at least 2 characters long" });
  } else {
    try {
      const users = await paginatedList(req, User, {
        username: {
          $regex: new RegExp(searchTerm, "ig"),
        },
      }).then((r) => {
        return {
          data: r.data.map((x) => ({
            username: x.username,
            name: x.name,
            avatar: x.avatar,
          })),
          meta: r.meta,
        };
      });

      res.send(users);
    } catch (error) {
      res.status(500).json({ message: "Server Error", error });
    }
  }
};

const userProfile = async (req, res) => {
  const username = req.params.username || req.user.username;

  try {
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
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

const userReviews = async (req, res) => {
  const uuid = req.params.uuid || req.user.uuid;

  try {
    await getReviewData(
      req,
      res,
      {
        userUuid: uuid,
      },
      false
    );
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

module.exports = {
  searchUser,
  userProfile,
  userReviews,
};
