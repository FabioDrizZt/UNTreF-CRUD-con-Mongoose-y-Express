const express = require("express");
const mongoose = require("mongoose");
const { Movie } = require("./schemas/movie");
const app = express();
process.loadEnvFile();
const PORT = process.env.PORT || 3000;
const { DB_PROTOCOL, DB_HOST, DB_PASS, DB_USER, DB_OPTIONS, DB_NAME } =
  process.env;
const MONGODB_URI = `${DB_PROTOCOL}://${DB_USER}:${DB_PASS}@${DB_HOST}/${DB_NAME}?${DB_OPTIONS}`;
app.use(express.json());

app.get("/", async (req, res) => {
  return res.json({ message: "Hoal, Mundo !" });
});

app.get("/peliculas", async (req, res) => {
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

app.get("/peliculas/:id", async (req, res) => {
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

app.post("/peliculas", async (req, res) => {
  const newMovie = new Movie(req.body);
  try {
    const insertedMovie = await newMovie.save();
    res.status(201).json(insertedMovie);
  } catch (error) {
    res.status(500).json(error);
  }
});

app.delete("/peliculas/:id", async (req, res) => {
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

app.patch("/peliculas/:id", async (req, res) => {
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

app.listen(PORT, async () => {
  await mongoose.connect(MONGODB_URI);
  console.log(`http://localhost:${PORT}`);
});
