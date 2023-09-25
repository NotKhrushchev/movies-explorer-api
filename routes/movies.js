const movieRoute = require('express').Router();
const { getSavedMovies, postMovie, deleteMovie } = require('../controllers/movies');
const { postMovieCelebrate, deleteMovieCelebrate } = require('../middlewares/celebrateValidators');

/** Роут получения сохраненных фильмов */
movieRoute.get('/', getSavedMovies);

/** Роут создания фильма */
movieRoute.post('/', postMovieCelebrate, postMovie);

/** Роут удаления фильма */
movieRoute.delete('/:movieId', deleteMovieCelebrate, deleteMovie);

module.exports = movieRoute;
