const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const filmSchema = new Schema({
  name: String,
  id: Number,
  genres: [String],
  image: String,
});

const userSchema = new Schema({
  uuid: String,
  name: String,
  avatar: String,
  username: String,
});

const reviewSchema = new Schema({
  film: filmSchema,
  rating: Number,
  comments: String,
  user: userSchema,
  location: String,
  createdAt: Date,
  date: Date,
});

const ReviewModel = mongoose.model("Review", reviewSchema);

module.exports = ReviewModel;
