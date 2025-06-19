const { Movie } = require("../models/movie");

const getMovies = (req, res) => {
  const genre = req.query.genero;
  const query = !genre ? {} : { genre: { $regex: genre, $options: "i" } };
  Movie.find(query)
    .then((movies) => {
      if (movies.length === 0) {
        res.status(404).json({ message: "Movie not found" });
      } else {
        res.json(movies);
      }
    })
    .catch((err) => res.status(500).json(err));
};

const getMovieById = (req, res) => {
  const { id } = req.params;
  Movie.findById(id)
    .then((movie) => {
      if (!movie) {
        res.status(404).json({ message: "Movie not found" });
      } else {
        res.json(movie);
      }
    })
    .catch((err) => res.status(500).json(err));
};

const createMovie = (req, res) => {
  const newMovie = new Movie(req.body);
  newMovie
    .save()
    .then((insertedMovie) => res.status(201).json(insertedMovie))
    .catch((err) => res.status(500).json(err));
};

const deleteMovie = (req, res) => {
  const { id } = req.params;
  Movie.findByIdAndDelete(id)
    .then((deletedMovie) => {
      if (!deletedMovie) {
        res.status(404).json({ message: "Movie not found" });
      } else {
        res.json(deletedMovie);
      }
    })
    .catch((err) => res.status(500).json(err));
};

const updateMovie = (req, res) => {
  const { id } = req.params;
  Movie.findByIdAndUpdate(id, req.body, { new: true })
    .then((updatedMovie) => {
      if (!updatedMovie) {
        res.status(404).json({ message: "Movie not found" });
      } else {
        res.json(updatedMovie);
      }
    })
    .catch((err) => res.status(500).json(err));
};

module.exports = {
  getMovies,
  getMovieById,
  createMovie,
  deleteMovie,
  updateMovie,
};
