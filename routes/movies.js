const router = require("express").Router();
const {
  getMovies,
  getMovieById,
  createMovie,
  deleteMovie,
  updateMovie,
} = require("../controllers/moviesPromesas"); 
// = require("../controllers/movies");

router.get("/", getMovies);
router.get("/:id", getMovieById);
router.post("/", createMovie);
router.delete("/:id", deleteMovie);
router.patch("/:id", updateMovie);

module.exports = router;
