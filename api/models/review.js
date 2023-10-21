const mongoose = require("mongoose");
const Schema = mongoose.Schema;

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

module.exports = ReviewModel;
