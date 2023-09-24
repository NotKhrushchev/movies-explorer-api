require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { errors } = require('celebrate');
const helmet = require('helmet');
const { errorHandler } = require('./middlewares/errorHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { NotFoundErr } = require('./errors');
const { limiter } = require('./middlewares/rateLimiter');
const { pageNotFound } = require('./utils/messages');
const router = require('./routes/index');

const { PORT = 3000 } = process.env;
const { DATABASE_URL = 'mongodb://127.0.0.1:27017/movie-explorer-api' } = process.env;

/** Точка входа */
const app = express();

/** Доступ обращения к ресурсам другого домена */
app.use(cors());

/** Дополнительная защита промежуточной обработки */
app.use(helmet());

/** Лимит по кол-ву запросов */
app.use(limiter);

/** Парсер данных в json */
app.use(express.json());

/** Подключение БД */
mongoose.connect(DATABASE_URL, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  autoIndex: true,
});

/** Логгер запросов */
app.use(requestLogger);

/** Маршруты */
app.use(router);

/** Обработка несуществующих маршрутов */
app.get('*', () => {
  throw new NotFoundErr(pageNotFound);
});

/** Логгер ошибок */
app.use(errorLogger);

/** Обработчик ошибок селебрейта */
app.use(errors());

/** Централизованный мидлвэр для обработки ошибок */
app.use(errorHandler);

/** Установка порта */
app.listen(PORT);
