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
    const query = {
      contentId: req.params.id,
    };

    if (req.user?.uuid) {
      query.userUuid = { $ne: req.user.uuid };
    }

    await getReviewData(req, res, query, true, false);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

module.exports = {
  postReview,
  getContentReviews,
};
