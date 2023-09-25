const { NOT_FOUND } = require('http-status-codes').StatusCodes;
const { notFound } = require('../utils/messages');

class NotFoundErr extends Error {
  constructor(message = notFound) {
    super(message);
    this.statusCode = NOT_FOUND;
  }
}

module.exports = NotFoundErr;
