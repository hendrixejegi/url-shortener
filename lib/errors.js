class CustomError extends Error {
  constructor({ message, statusCode, code = '' }) {
    super();
    this.message = message;
    this.statusCode = statusCode;
    this.code = code;
  }
}

module.exports = CustomError;
