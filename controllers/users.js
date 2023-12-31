const bcrypt = require('bcryptjs/dist/bcrypt');
/** Статусы ошибок */
const { CREATED, OK } = require('http-status-codes').StatusCodes;
const { default: mongoose } = require('mongoose');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const { JWT_SECRET = 'super-secret-key' } = process.env;
const { DuplicateEmailErr, BadRequestErr } = require('../errors');
const AuthorizationErr = require('../errors/AuthorizationErr');
const { userUpdated } = require('../utils/messages');

/** Аутентификация */
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

/** Авторизация */
const login = (req, res, next) => {
  const { email, password } = req.body;

  /** Возвращаю password в ответ */
  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new AuthorizationErr();
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new AuthorizationErr();
          }
          //* * Создаю токен сроком на 7 дней */
          const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: '7d' });
          return res.send({ token });
        });
    })
    .catch(next);
};

/** Получение данных пользователя */
const getUserInfo = (req, res, next) => {
  /** Беру id из мидлвэра провеки jwt */
  const { _id } = req.user;

  User.findById(_id)
    .then((user) => {
      const { email, name } = user;
      res.status(OK).send({ email, name });
    })
    .catch(next);
};

/** Изменение данных пользователя */
const editUserInfo = (req, res, next) => {
  /** Беру id из мидлвэра провеки jwt */
  const { _id } = req.user;
  const { email, name } = req.body;
  User.findByIdAndUpdate(
    _id,
    { email, name },
    { new: true, runValidators: true },
  )
    .then(() => res.status(OK).send({ message: userUpdated }))
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
  getUserInfo,
  login,
  editUserInfo,
};
