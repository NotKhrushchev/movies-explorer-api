const movieRoute = require('express').Router();
const { getSavedMovies, postMovie } = require('../controllers/movies');
const { postMovieCelebrate } = require('../middlewares/celebrateValidators');

/** Роут получения сохраненных фильмов */
movieRoute.get('/movies', getSavedMovies);

/** Роут создания фильма */
movieRoute.post('/movies', postMovieCelebrate, postMovie);

module.exports = movieRoute;
