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
  filmId: Number,
  rating: Number,
  comments: String,
  userUuid: String,
  location: String,
  createdAt: Date,
  date: Date,
});

const ReviewModel = mongoose.model("Review", reviewSchema);

module.exports = {
  User: UserModel,
  Review: ReviewModel,
};
