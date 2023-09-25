const { CONFLICT } = require('http-status-codes').StatusCodes;
const { emailAlreadyExist } = require('../utils/messages');

class DuplicateEmailErr extends Error {
  constructor(message = emailAlreadyExist) {
    super(message);
    this.statusCode = CONFLICT;
  }
}

module.exports = DuplicateEmailErr;
