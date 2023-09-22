const jwt = require('jsonwebtoken');

const { JWT_SECRET = 'super-secret-key' } = process.env;
const { AuthorizationErr } = require('../errors/index');

const authError = 'Необходима авторизация';

//* * Проверка на наличие токена  */
const checkToken = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new AuthorizationErr(authError);
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    next(new AuthorizationErr(authError));
  }
  req.user = payload;
  return next();
};

module.exports = {
  checkToken,
};
