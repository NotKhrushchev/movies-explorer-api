const { UNAUTHORIZED } = require('http-status-codes').StatusCodes;
const { wrongEmailOrPassword } = require('../utils/messages');

class AuthorizationErr extends Error {
  constructor(message = wrongEmailOrPassword) {
    super(message);
    this.statusCode = UNAUTHORIZED;
  }
}

module.exports = AuthorizationErr;
