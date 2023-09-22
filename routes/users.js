const userRoute = require('express').Router();
const { getUserInfo, editUserInfo } = require('../controllers/users');
const { editUserCelebrate } = require('../middlewares/celebrateValidators');

/** Роут получения данных пользователя */
userRoute.get('/me', getUserInfo);

/** Роут изменения данных пользователя */
userRoute.patch('/me', editUserCelebrate, editUserInfo);

module.exports = userRoute;
