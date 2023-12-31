const { INTERNAL_SERVER_ERROR } = require('http-status-codes').StatusCodes;
const { serverError } = require('../utils/messages');

const errorHandler = ((err, req, res, next) => {
  const { statusCode = INTERNAL_SERVER_ERROR, message } = err;

  res.status(statusCode).send(
    { message: statusCode === INTERNAL_SERVER_ERROR ? serverError : message },
  );
  next();
});

module.exports = {
  errorHandler,
};
