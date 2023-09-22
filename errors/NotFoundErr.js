const { NOT_FOUND } = require('http-status-codes').StatusCodes;

class NotFoundErr extends Error {
  constructor(message = 'Не найдено') {
    super(message);
    this.statusCode = NOT_FOUND;
  }
}

module.exports = NotFoundErr;
