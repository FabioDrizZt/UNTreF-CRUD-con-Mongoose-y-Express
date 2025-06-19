const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const moviesRoutes = require("./routes/movies");
const { connectDB } = require("./config/database");
connectDB();

// middlewares
app.use(express.json());

// routes
app.get("/", async (req, res) => {
  return res.json({ message: "Hoal, Mundo !" });
});
app.use("/peliculas", moviesRoutes);

app.listen(PORT, async () => {
  console.log(`http://localhost:${PORT}`);
});
