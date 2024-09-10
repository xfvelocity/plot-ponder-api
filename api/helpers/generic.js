const bcrupt = require("bcrypt");
const jwt = require("jsonwebtoken");
const axios = require("axios");

const { Review, User } = require("../models/index");

// ** Auth **
const hashPassword = (password) => {
  return new Promise((resolve, reject) => {
    bcrupt.genSalt(12, (err, salt) => {
      if (err) {
        reject(err);
      }

      bcrupt.hash(password, salt, (err, hash) => {
        if (err) {
          reject(err);
        }

        resolve(hash);
      });
    });
  });
};

const comparePassword = (password, hashedPassword) => {
  return bcrupt.compare(password, hashedPassword);
};

const authenticateToken = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ message: "Access denied. Token missing." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ message: "Access denied. Invalid token." });
  }
};

const getUserFromToken = (req, res, next) => {
  const token = req.header("Authorization");

  try {
    if (token) {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
    }

    next();
  } catch (error) {
    return res.status(403).json({ message: error });
  }
};

const authenticateClientToken = (req, res, next) => {
  const token = req.header("Client-Auth");

  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. Clien token missing." });
  }

  if (token == process.env.CLIENT_TOKEN) {
    return { success: true };
  } else {
    return res
      .status(403)
      .json({ message: "Access denied. Invalid client token." });
  }
};

// ** Reviews **
const getReviewData = async (
  req,
  res,
  query = {},
  getUser = true,
  getContent = true
) => {
  const reviews = await paginatedList(req, Review, query, { createdAt: -1 });

  reviews.data = await Promise.all(
    reviews.data.map(async (review) => {
      if (getUser) {
        const user = await User.findOne({ uuid: review.userUuid });

        review.user = {
          name: user.name,
          username: user.username,
          avatar: user.avatar,
        };
      }

      if (getContent) {
        const type = review.type === "film" ? "movie" : "tv";
        const res = await axios.get(
          `https://api.themoviedb.org/3/${type}/${review.contentId}`,
          {
            headers: {
              accept: "application/json",
              Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
            },
          }
        );

        const { title, name, genres, release_date, overview, poster_path } =
          res.data;

        review.content = {
          name: title || name,
          genres: genres.map((x) => x.name),
          releaseDate: release_date,
          overview,
          image: `https://image.tmdb.org/t/p/original${poster_path}`,
        };
      }

      return review;
    })
  );

  res.json(reviews);
};

// ** Paginated list **
const paginatedList = async (req, model, query, sortBy = {}) => {
  const page = parseInt(req.query.page || "") || 1;
  const perPage = parseInt(req.query.perPage || "") || 10;

  const pageItems = await model
    .find(query)
    .sort(sortBy)
    .skip((page - 1) * perPage)
    .limit(perPage)
    .lean();
  const total = await model.countDocuments(query);

  return {
    data: pageItems,
    meta: {
      page,
      perPage,
      totalPages: Math.ceil(total / perPage),
      total,
    },
  };
};

module.exports = {
  getUserFromToken,
  paginatedList,
  authenticateClientToken,
  getReviewData,
  hashPassword,
  comparePassword,
  authenticateToken,
};
