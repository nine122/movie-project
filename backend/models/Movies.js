const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const MovieSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
    },
    genre: {
      type: String,
      required: true,
    },
    duration: {
      type: String,
    },
    trailer: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Movies", MovieSchema);
