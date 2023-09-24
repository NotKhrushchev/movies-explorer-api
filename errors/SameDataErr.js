const { CONFLICT } = require('http-status-codes').StatusCodes;
const { dataMatches } = require('../utils/messages');

class SameDataErr extends Error {
  constructor(message = dataMatches) {
    super(message);
    this.statusCode = CONFLICT;
  }
}

module.exports = SameDataErr;
