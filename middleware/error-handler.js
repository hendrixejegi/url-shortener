const CustomError = require('../lib/errors');
const { getErrorMessage } = require('../lib/utils');

const errorHandler = (err, req, res, next) => {
  if (res.headersSent || process.env.APP_DEBUG === 'true') {
    return next(err);
  }

  if (err instanceof CustomError) {
    return res
      .status(err.statusCode)
      .json({ msg: `[${err.code}]: ${err.message}` });
  }

  return res
    .status(500)
    .json({ message: getErrorMessage(err) || 'Internal Server Error' });
};

module.exports = errorHandler;
