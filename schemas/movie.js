const mongoose = require("mongoose");
const MovieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  poster: {
    type: String,
  },
  genre: {
    type: [String],
    required: true,
  },
  rate: {
    type: Number,
    required: false,
    default: 5,
  },
});

const Movie = mongoose.model("Movie", MovieSchema);

module.exports = { Movie };
