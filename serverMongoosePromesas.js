const express = require("express");
const mongoose = require("mongoose");
const { Movie } = require("./models/movie");
const app = express();
process.loadEnvFile();
const PORT = process.env.PORT || 3000;
const { DB_PROTOCOL, DB_HOST, DB_PASS, DB_USER, DB_OPTIONS, DB_NAME } =
  process.env;
const MONGODB_URI = `${DB_PROTOCOL}://${DB_USER}:${DB_PASS}@${DB_HOST}/${DB_NAME}?${DB_OPTIONS}`;
app.use(express.json());

app.get("/", (req, res) => {
  return res.json({ message: "Hoal, Mundo !" });
});

app.get("/peliculas", (req, res) => {
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
});

app.get("/peliculas/:id", (req, res) => {
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
});

app.post("/peliculas", (req, res) => {
  const newMovie = new Movie(req.body);
  newMovie
    .save()
    .then((insertedMovie) => res.status(201).json(insertedMovie))
    .catch((err) => res.status(500).json(err));
});

app.delete("/peliculas/:id", (req, res) => {
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
});

app.patch("/peliculas/:id", (req, res) => {
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
});

app.listen(PORT, () => {
  mongoose.connect(MONGODB_URI);
  console.log(`http://localhost:${PORT}`);
});
