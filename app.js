require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { errors } = require('celebrate');
const helmet = require('helmet');
const { errorHandler } = require('./middlewares/errorHandler');
const { userRoute } = require('./routes/index');
const { createUser } = require('./controllers/users');
const { createUserCelebrate } = require('./middlewares/celebrateValidators');

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
app.post('/signup', createUserCelebrate, createUser);

/** Роуты для работы с пользователем */
app.use('/users', userRoute);

/** Обработчик ошибок селебрейта */
app.use(errors());

/** Централизованный мидлвэр для обработки ошибок */
app.use(errorHandler);

/** Установка порта */
app.listen(PORT);
