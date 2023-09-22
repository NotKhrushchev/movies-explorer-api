const { UNAUTHORIZED } = require('http-status-codes').StatusCodes;

class AuthorizationErr extends Error {
  constructor(message = 'Неправильные почта или пароль') {
    super(message);
    this.statusCode = UNAUTHORIZED;
  }
}

module.exports = AuthorizationErr;
