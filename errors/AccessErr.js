const { FORBIDDEN } = require('http-status-codes').StatusCodes;
const { accessError } = require('../utils/messages');

class AccessErr extends Error {
  constructor(message = accessError) {
    super(message);
    this.statusCode = FORBIDDEN;
  }
}

module.exports = AccessErr;
