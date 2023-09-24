const { OK, CREATED } = require('http-status-codes').StatusCodes;
const { default: mongoose } = require('mongoose');
const { BadRequestErr, NotFoundErr, AccessErr } = require('../errors');
const Movie = require('../models/movie');
const { filmNotFoundById, notValidFilmId, filmDeleted } = require('../utils/messages');

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
  /** Беру id из мидлвэра провеки jwt */
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

/** Удаление фильма */
const deleteMovie = (req, res, next) => {
  const { _id } = req.user;
  const { movieId } = req.params;

  Movie.findOne({ movieId, owner: _id })
    .orFail()
    .then((movie) => {
      if (!movie.owner.equals(_id)) {
        throw new AccessErr();
      }
      Movie.deleteOne({ movieId })
        .then(() => res.status(OK).send({ message: filmDeleted }))
        .catch(next);
    })
    .catch((err) => {
      switch (err.constructor) {
        case mongoose.Error.CastError:
          next(new BadRequestErr(notValidFilmId));
          break;
        case mongoose.Error.DocumentNotFoundError:
          next(new NotFoundErr(filmNotFoundById));
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
  deleteMovie,
};
