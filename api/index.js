const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const { authenticateToken } = require("./helpers/auth");
require("dotenv/config");

mongoose
  .connect(process.env.DB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to DB"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: ["http://localhost:5173"],
  })
);

app.use((req, res, next) => {
  if (["/api/login", "/api/register"].includes(req.originalUrl)) {
    return next();
  } else {
    return authenticateToken(req, res, next);
  }
});

app.get("/api", (req, res) => {
  res.setHeader("Content-Type", "text/html");
  res.setHeader("Cache-Control", "s-max-age=1, stale-while-revalidate");
  res.end(`Plot Ponder API`);
});

app.use("/api", require("./routes/auth"));
app.use("/api", require("./routes/review"));
app.use("/api", require("./routes/user"));
app.use("/api", require("./routes/feed"));

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
