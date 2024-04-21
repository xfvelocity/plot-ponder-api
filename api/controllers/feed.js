const { getReviewData } = require("../helpers/generic");

const getFeed = async (req, res) => {
  try {
    if (req.user?.uuid) {
      await getReviewData(req, res, {
        userUuid: { $ne: req.user.uuid },
      });
    } else {
      await getReviewData(req, res);
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

module.exports = {
  getFeed,
};
