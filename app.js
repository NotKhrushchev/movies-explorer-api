require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const { createUser } = require('./controllers/users');
const { errorHandler } = require('./middlewares/errorHandler');

const { PORT = 3000 } = process.env;
const { DATABASE_URL = 'mongodb://127.0.0.1:27017/movie-explorer-api' } = process.env;

/** Точка входа */
const app = express();

/** Доступ обращения к ресурсам другого домена */
app.use(cors());

/** Дополнительная защита промежуточной обработки */
app.use(helmet());

/** Парсер данных в json */
app.use(express.json());

/** Подключение БД */
mongoose.connect(DATABASE_URL, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  autoIndex: true,
});

/** Роут регистрации */
app.post('/signup', createUser);

/** Централизованный мидлвэр для обработки ошибок */
app.use(errorHandler);

/** Установка порта */
app.listen(PORT);
