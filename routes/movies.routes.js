const router = require("express").Router();
const Movie = require("../models/Movie.model.js");

// GET route to retrieve and display all the movies
router.get("/movies", (req, res, next) => {
  Movie.find()
    .then((allMovies) => {
      console.log("Retrieved movies from DB:", allMovies);
      res.render("movies/movies.hbs", { movies: allMovies });
    })
    .catch((error) => {
      console.log("Error while getting the movies from the DB: ", error);

      // Call the error-middleware to display the error page to the user
      next(error);
    });
});

// GET route to retrieve and display details of a specific movie
router.get("/movies/:movieId", (req, res) => {
  const movieId = req.params.movieId;

  Movie.findOne({ _id: movieId })
    .then((foundMovie) => {
      console.log("foundMovie", foundMovie);
      res.render("movies/movie-details.hbs", foundMovie);
    })
    .catch((err) => console.log(err));
});

module.exports = router;
