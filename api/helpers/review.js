const Review = require("../models/review");
const User = require("../models/user");
const axios = require("axios");

const getReviewData = async (req, res, query = {}) => {
  const page = parseInt(req.query.page || "") || 1;
  const perPage = parseInt(req.query.perPage || "") || 10;

  const total = await Review.countDocuments(query);
  let reviews = await Review.find(query)
    .sort({ createdAt: -1 })
    .skip((page - 1) * perPage)
    .limit(perPage)
    .lean();

  reviews = await Promise.all(
    reviews.map(async (review) => {
      if (!query.userUuid) {
        const user = await User.findOne({ uuid: userUuid });

        review.user = {
          name: user.name,
          username: user.username,
          avatar: user.avatar,
        };
      }

      const res = await axios.get(
        `https://api.themoviedb.org/3/movie/${review.filmId}`,
        {
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
          },
        }
      );

      const { title, genres, release_date, overview, poster_path } = res.data;

      review.film = {
        name: title,
        genres: genres.map((x) => x.name),
        releaseDate: release_date,
        overview,
        image: `https://image.tmdb.org/t/p/original${poster_path}`,
      };

      return review;
    })
  );

  res.json({
    data: reviews,
    meta: {
      page,
      perPage,
      totalPages: Math.ceil(total / perPage),
      total,
    },
  });
};

module.exports = {
  getReviewData,
};
