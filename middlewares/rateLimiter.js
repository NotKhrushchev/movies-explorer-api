const rateLimiter = require('express-rate-limit');

const limiter = rateLimiter({
  windowMs: 15 * 60 * 10000,
  max: 10000,
  standardHeaders: true,
  legacyHeaders: false,
});

module.exports = {
  limiter,
};
