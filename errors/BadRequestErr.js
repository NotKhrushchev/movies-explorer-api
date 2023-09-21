const { BAD_REQUEST } = require('http-status-codes').StatusCodes;

class BadRequestErr extends Error {
  constructor(message = 'Переданы невалидные данные') {
    super(message);
    this.statusCode = BAD_REQUEST;
  }
}

module.exports = BadRequestErr;
