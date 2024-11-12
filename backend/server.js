const express = require("express");
require("dotenv").config();
const morgan = require("morgan");
const MoviesRoutes = require("./routes/movies");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

const mongoURL =
  "mongodb+srv://khn122:test123@movie-cluster.fqlewe5.mongodb.net/?retryWrites=true&w=majority&appName=movie-cluster";
mongoose.connect(mongoURL).then(() => {
  console.log("connect to db");
  app.listen(process.env.PORT, () => {
    console.log("app is running on localhost:" + process.env.PORT);
  });
});

app.use(cors());
app.use(express.json());
app.use(express.static("public"));
app.use(morgan("dev"));

app.get("/", (req, res) => {
  return res.json({ hello: "world" });
});

app.use("/api/movies", MoviesRoutes);
