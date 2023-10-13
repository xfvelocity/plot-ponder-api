const Review = require("../models/review");

const getFeed = async (req, res) => {
  const uuid = req.params.uuid || req.user.uuid;

  const reviews = await Review.find({});

  console.log(reviews);

  res.send({});
};

module.exports = {
  getFeed,
};
