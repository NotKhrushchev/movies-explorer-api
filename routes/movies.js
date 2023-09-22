const movieRoute = require('express').Router();
const { getSavedMovies } = require('../controllers/movies');

/** Роут получения сохраненных фильмов */
movieRoute.get('/movies', getSavedMovies);

module.exports = movieRoute;
