const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Поле email обязательное'],
    unique: [true, 'Пользователь с таким email уже существует'],
    validate: {
      validator: (email) => validator.isEmail(email),
      message: 'Введите корректный email',
    },
  },
  password: {
    type: String,
    required: [true, 'Поле password обязательное'],
    select: false,
  },
  name: {
    type: String,
    required: [true, 'Поле name обязательное'],
    minlength: [2, 'Минимальная длина name - 2'],
    maxlength: [30, 'Максимальная длина name - 30'],
  },
});

module.exports = mongoose.model('user', userSchema);
