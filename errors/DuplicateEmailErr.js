const { CONFLICT } = require('http-status-codes').StatusCodes;

class DuplicateEmailErr extends Error {
  constructor(message = 'Указанный email уже существует') {
    super(message);
    this.statusCode = CONFLICT;
  }
}

module.exports = DuplicateEmailErr;
