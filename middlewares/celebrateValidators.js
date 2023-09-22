const { celebrate, Joi } = require('celebrate');

const createUserCelebrate = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),
  }),
});

const getUserInfoCelebrate = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().required().hex().length(24),
  }),
});

module.exports = {
  createUserCelebrate,
  getUserInfoCelebrate,
};
