const userRoute = require('express').Router();
const { getUserInfo } = require('../controllers/users');

/** Роут получения данных пользователя */
userRoute.get('/me', getUserInfo);

module.exports = userRoute;
