const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const filmSchema = new Schema({
  name: String,
  id: Number,
  genres: [String],
  image: String,
});

const reviewSchema = new Schema({
  film: filmSchema,
  rating: Number,
  comments: String,
  userUuid: String,
  location: String,
  date: Date,
});

const ReviewModel = mongoose.model("Review", reviewSchema);

module.exports = ReviewModel;
