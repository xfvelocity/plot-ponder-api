const Review = require("../models/review");

const getFeed = async (req, res) => {
  const page = parseInt(req.query.page || "") || 1;
  const perPage = parseInt(req.query.perPage || "") || 10;
  const query = {
    "user.uuid": { $ne: req.user.uuid },
  };

  try {
    const total = await Review.countDocuments(query);

    const reviews = await Review.find(query)
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
  getFeed,
};
