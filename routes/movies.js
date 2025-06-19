const { Movie } = require("../models/movie");
const router = require("express").Router();

router.get("/", async (req, res) => {
  const genre = req.query.genero;
  const query = !genre ? {} : { genre: { $regex: genre, $options: "i" } };
  try {
    const movies = await Movie.find(query);
    if (movies.length === 0) {
      res.status(404).json({ message: "Movie not found" });
    } else {
      res.json(movies);
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const movie = await Movie.findById(id);
    if (!movie) {
      res.status(404).json({ message: "Movie not found" });
    } else {
      res.json(movie);
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/", async (req, res) => {
  const newMovie = new Movie(req.body);
  try {
    const insertedMovie = await newMovie.save();
    res.status(201).json(insertedMovie);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedMovie = await Movie.findByIdAndDelete(id);
    if (!deletedMovie) {
      res.status(404).json({ message: "Movie not found" });
    } else {
      res.json(deletedMovie);
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

router.patch("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const updatedMovie = await Movie.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedMovie) {
      res.status(404).json({ message: "Movie not found" });
    } else {
      res.json(updatedMovie);
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;