require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { errors } = require('celebrate');
const helmet = require('helmet');
const { errorHandler } = require('./middlewares/errorHandler');
const { userRoute } = require('./routes/index');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { createUser, login } = require('./controllers/users');
const { createUserCelebrate, loginCelebrate } = require('./middlewares/celebrateValidators');
const { checkToken } = require('./middlewares/checkToken');
const movieRoute = require('./routes/movies');
const { NotFoundErr } = require('./errors');
const { pageNotFound } = require('./utils/messages');

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

/** Логгер запросов */
app.use(requestLogger);

/** Обработка несуществующего роута */
app.use('*', () => {
  throw new NotFoundErr(pageNotFound);
});

/** Роут аутентификации */
app.post('/signup', createUserCelebrate, createUser);

/** Роут авторизации */
app.post('/signin', loginCelebrate, login);

/** Защита нижеперечисленных роутов */
app.use(checkToken);

/** Роуты для работы с пользователем */
app.use('/users', userRoute);

/** Роуты для работы с фильмами */
app.use('/movies', movieRoute);

/** Логгер ошибок */
app.use(errorLogger);

/** Обработчик ошибок селебрейта */
app.use(errors());

/** Централизованный мидлвэр для обработки ошибок */
app.use(errorHandler);

/** Установка порта */
app.listen(PORT);
