const bcrypt = require('bcryptjs/dist/bcrypt');
/** Статусы ошибок */
const { CREATED, OK } = require('http-status-codes').StatusCodes;
const { default: mongoose } = require('mongoose');
const User = require('../models/user');
const { DuplicateEmailErr, BadRequestErr, NotFoundErr } = require('../errors');

/** Создание пользователя */
const createUser = (req, res, next) => {
  const { email, password, name } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({ email, password: hash, name }))
    .then((postedUser) => {
      /**
       * Костыль для удаления password при возвращении пользователя,
       * в схеме "select: false" не работает
       */
      const user = postedUser;
      user.password = undefined;
      res.status(CREATED).send(user);
    })
    .catch((err) => {
      if (err.code === 11000) {
        next(new DuplicateEmailErr());
        return;
      }
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

const getUserInfo = (req, res, next) => {
  /** Беру id из запроса */
  const { userId } = req.params;
  User.findById(userId)
    /** Для работы DocumentNotFoundError */
    .orFail()
    .then((user) => res.status(OK).send(user))
    .catch((err) => {
      switch (err.constructor) {
        case mongoose.Error.CastError:
          next(new BadRequestErr('Передан невалидный id пользователя'));
          break;
        case mongoose.Error.DocumentNotFoundError:
          next(new NotFoundErr('Пользователь по указанному id не найден'));
          break;
        default:
          break;
      }
    });
};

module.exports = {
  createUser,
  getUserInfo,
};
