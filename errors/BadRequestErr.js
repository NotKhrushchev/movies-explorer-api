const { BAD_REQUEST } = require('http-status-codes').StatusCodes;
const { sendNotValidData } = require('../utils/messages');

class BadRequestErr extends Error {
  constructor(message = sendNotValidData) {
    super(message);
    this.statusCode = BAD_REQUEST;
  }
}

module.exports = BadRequestErr;
