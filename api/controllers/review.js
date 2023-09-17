const Review = require("../models/review");

const postReview = async (req, res) => {
  try {
    const review = await Review.create({
      ...req.body,
      userUuid: req.user.uuid,
    });

    return res.status(200).send(review);
  } catch (e) {
    res.status(500).send(e);
  }
};

module.exports = {
  postReview,
};
