const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// ** User **
const userSchema = new Schema({
  uuid: String,
  name: String,
  avatar: String,
  username: {
    type: String,
    unique: true,
  },
  email: {
    type: String,
    unique: true,
  },
  password: String,
});

const UserModel = mongoose.model("User", userSchema);

// ** Review **
const reviewSchema = new Schema({
  uuid: String,
  contentId: Number,
  rating: Number,
  comments: String,
  userUuid: String,
  location: String,
  createdAt: Date,
  date: Date,
  type: String,
});

const ReviewModel = mongoose.model("Review", reviewSchema);

// ** Comments **
const commentSchema = new Schema({
  uuid: String,
  reviewUuid: String,
  content: String,
  createdAt: Date,
  userUuid: String,
});

const CommentModel = mongoose.model("Comment", commentSchema);

module.exports = {
  User: UserModel,
  Review: ReviewModel,
  Comment: CommentModel,
};
