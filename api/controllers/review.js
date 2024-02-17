const { getReviewData } = require("../helpers/generic");
const { Review } = require("../models/index");

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

const getContentReviews = async (req, res) => {
  try {
    await getReviewData(
      req,
      res,
      {
        contentId: req.params.id,
        userUuid: { $ne: req.user.uuid },
      },
      true,
      false
    );
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

module.exports = {
  postReview,
  getContentReviews,
};
