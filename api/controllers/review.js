const Review = require("../models/review");

const postReview = async (req, res) => {
  try {
    const review = await Review.create({
      ...req.body,
      createdAt: new Date(),
      userUuid: req.user.uuid,
    });

    return res.status(200).send(review);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

module.exports = {
  postReview,
};
