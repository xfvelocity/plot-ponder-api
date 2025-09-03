const { Comment } = require("../models");
const { v4: uuidv4 } = require("uuid");
const { getReviewData, paginatedList } = require("../helpers/generic");

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
    console.error(error);

    res.status(500).json({ message: "Server Error", error });
  }
};

const getComments = async (req, res) => {
  try {
    const comments = await paginatedList(req, Comment, {
      reviewUuid: req.params.uuid,
    });

    return res.status(200).send(comments);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

const postComment = async (req, res) => {
  try {
    const comment = await Comment.create({
      ...req.body,
      uuid: uuidv4(),
      reviewUuid: req.params.uuid,
      createdAt: new Date(),
      userUuid: req.user.uuid,
    });

    return res.status(200).send(comment);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error", error });
  }
};

module.exports = {
  getFeed,
  getComments,
  postComment,
};
