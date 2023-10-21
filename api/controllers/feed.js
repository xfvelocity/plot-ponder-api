const { getReviewData } = require("../helpers/review");

const getFeed = async (req, res) => {
  try {
    await getReviewData(req, res, {
      userUuid: { $ne: req.user.uuid },
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

module.exports = {
  getFeed,
};
