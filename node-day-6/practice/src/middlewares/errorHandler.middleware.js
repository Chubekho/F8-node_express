const { JsonWebTokenError, TokenExpiredError } = require("jsonwebtoken");

const errorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal Server Error";

  if (err instanceof JsonWebTokenError) {
    statusCode = 401;
    message = "Unauthorized: Invalid Token";
  }
  if (err instanceof TokenExpiredError) {
    statusCode = 401;
    message = "Unauthorized: Token Expired";
  }

  if (err.message === "USER_EXISTED") {
    statusCode = 409;
    message = "Email existed!";
  }

  res.error(message, statusCode);
};

module.exports = errorHandler;
