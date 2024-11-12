const Movie = require("../models/Movies");
const mongoose = require("mongoose");
const fs = require("fs").promises;
const removeFile = require("../helpers/removeFile");
const MovieController = {
  index: async (req, res) => {
    let movies = await Movie.find().sort({ createdAt: -1 });
    return res.json(movies);
  },
  store: async (req, res) => {
    try {
      const { title, genre, duration, trailer } = req.body;

      const movie = await Movie.create({
        title,
        genre,
        duration,
        trailer,
      });
      return res.json(movie);
    } catch (e) {
      return res.status(500).json({ msg: "internet server error" });
    }
  },
  show: async (req, res) => {
    try {
      let id = req.params.id;
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ msg: "not a valid id" });
      }
      let movie = await Movie.findById(id);
      if (!movie) {
        return res.status(404).json({ msg: "recipe not found" });
      }
      return res.json(movie);
    } catch (e) {
      return res.status(500).json({ msg: "internet server error" });
    }
  },
  destroy: async (req, res) => {
    try {
      let id = req.params.id;
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ msg: "not a valid id" });
      }
      let movie = await Movie.findByIdAndDelete(id);
      await removeFile(__dirname + "/../public" + movie.photo);

      if (!movie) {
        return res.status(404).json({ msg: "recipe not found" });
      }
      return res.json(movie);
    } catch (e) {
      return res.status(500).json({ msg: "internet server error" });
    }
  },
  update: async (req, res) => {
    try {
      let id = req.params.id;
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ msg: "not a valid id" });
      }
      let movie = await Movie.findByIdAndUpdate(id, {
        ...req.body,
      });

      await removeFile(__dirname + "/../public" + movie.photo);
      if (!movie) {
        return res.status(404).json({ msg: "recipe not found" });
      }
      return res.json(movie);
    } catch (e) {
      return res.status(500).json({ msg: "internet server error" });
    }
  },

  upload: async (req, res) => {
    try {
      let id = req.params.id;
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ msg: "not a valid id" });
      }
      let movie = await Movie.findByIdAndUpdate(id, {
        photo: "/" + req.file.filename,
      });
      if (!movie) {
        return res.status(404).json({ msg: "recipe not found" });
      }
      return res.json(movie);
    } catch (e) {
      return res.status(500).json({ msg: "internet server error" });
    }
  },
};

module.exports = MovieController;
