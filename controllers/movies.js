const { OK, CREATED } = require('http-status-codes').StatusCodes;
const { default: mongoose } = require('mongoose');
const { BadRequestErr } = require('../errors');
const Movie = require('../models/movie');

/** Получение сохраненных фильмов */
const getSavedMovies = (req, res, next) => {
  /** Беру id из мидлвэра провеки jwt */
  const { _id } = req.user;

  Movie.find({ owner: _id })
    .then((movies) => res.status(OK).send(movies))
    .catch(next);
};

/** Создание фильма */
const postMovie = (req, res, next) => {
  const { _id } = req.user;
  const movieInfo = req.body;
  Movie.create({ ...movieInfo, owner: _id })
    .then((movie) => res.status(CREATED).send(movie))
    .catch((err) => {
      switch (err.constructor) {
        case mongoose.Error.ValidationError:
          next(new BadRequestErr(err.message));
          break;
        default:
          next(err);
          break;
      }
    });
};

module.exports = {
  getSavedMovies,
  postMovie,
};
