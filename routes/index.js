const router = require('express').Router();
const { checkToken } = require('../middlewares/checkToken');
const userRoute = require('./users');
const movieRoute = require('./movies');
const { createUserCelebrate, loginCelebrate } = require('../middlewares/celebrateValidators');
const { createUser, login } = require('../controllers/users');

/** Роут аутентификации */
router.post('/signup', createUserCelebrate, createUser);

/** Роут авторизации */
router.post('/signin', loginCelebrate, login);

/** Защита нижеперечисленных роутов */
router.use(checkToken);

/** Роуты для работы с пользователем */
router.use('/users', userRoute);

/** Роуты для работы с фильмами */
router.use('/movies', movieRoute);

module.exports = router;
