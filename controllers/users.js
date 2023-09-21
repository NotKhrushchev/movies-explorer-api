const bcrypt = require('bcryptjs/dist/bcrypt');
/** Статусы ошибок */
const { CREATED } = require('http-status-codes').StatusCodes;
const { default: mongoose } = require('mongoose');
const User = require('../models/user');
const { DuplicateEmailErr, BadRequestErr } = require('../errors');

/** Создание пользователя */
const createUser = (req, res, next) => {
  const { email, password, name } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({ email, password: hash, name }))
    .then((postedUser) => {
      /** Костыльный метод удаления свойства password при возвращении пользователя, в схеме select: false не работает */
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

module.exports = {
  createUser,
};
