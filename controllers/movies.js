const { OK } = require('http-status-codes').StatusCodes;
const Movie = require('../models/movie');

/** Получение сохраненных фильмов */
const getSavedMovies = (req, res, next) => {
  /** Беру id из мидлвэра провеки jwt */
  const { _id } = req.user;
  Movie.find({ owner: _id })
    .then((movies) => res.status(OK).send(movies))
    .catch(next);
};

module.exports = {
  getSavedMovies,
};
