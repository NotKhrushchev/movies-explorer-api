const userRoute = require('express').Router();
const { getUserInfo } = require('../controllers/users');
const { getUserInfoCelebrate } = require('../middlewares/celebrateValidators');

/** Роут получения данных пользователя */
userRoute.get('/:userId', getUserInfoCelebrate, getUserInfo);

module.exports = userRoute;
