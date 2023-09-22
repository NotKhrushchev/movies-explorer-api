const { FORBIDDEN } = require('http-status-codes').StatusCodes;

class AccessErr extends Error {
  constructor(message = 'Ошибка доступа') {
    super(message);
    this.statusCode = FORBIDDEN;
  }
}

module.exports = AccessErr;
