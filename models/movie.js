const mongoose = require('mongoose');
const { IMG_URL_REGEX, URL_REGEX } = require('../utils/constants');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: [true, 'Поле country обязательное'],
  },
  director: {
    type: String,
    required: [true, 'Поле director обязательное'],
  },
  duration: {
    type: Number,
    required: [true, 'Поле duration обязательное'],
  },
  year: {
    type: String,
    required: [true, 'Поле year обязательное'],
  },
  description: {
    type: String,
    required: [true, 'Поле description обязательное'],
  },
  image: {
    type: String,
    required: [true, 'Поле image обязательное'],
    validate: {
      validator: (link) => IMG_URL_REGEX.test(link),
      message: 'Укажите корректную ссылку',
    },
  },
  trailerLink: {
    type: String,
    required: [true, 'Поле trailerLink обязательное'],
    validate: {
      validator: (link) => URL_REGEX.test(link),
      message: 'Укажите корректную ссылку',
    },
  },
  thumbnail: {
    type: String,
    required: [true, 'Поле thumbnail обязательное'],
    validate: {
      validator: (link) => IMG_URL_REGEX.test(link),
      message: 'Укажите корректную ссылку',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: [true, 'Поле owner обязательное'],
  },
  movieId: {
    type: Number,
    required: [true, 'Поле movieId обязательное'],
  },
  nameRU: {
    type: String,
    required: [true, 'Поле nameRU обязательное'],
  },
  nameEN: {
    type: String,
    required: [true, 'Поле nameEN обязательное'],
  },
});

module.exports = mongoose.model('movie', movieSchema);
