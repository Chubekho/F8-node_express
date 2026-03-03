const { JsonWebTokenError, TokenExpiredError } = require("jsonwebtoken");
const { HTTP_STATUS } = require("../configs/constants");

const errorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || HTTP_STATUS.INTERNAL_SERVER_ERROR;
  let message = err.message || "Internal Server Error";

  if (err instanceof JsonWebTokenError) {
    statusCode = HTTP_STATUS.UNAUTHORIZED;
    message = "Unauthorized: Invalid Token";
  }
  if (err instanceof TokenExpiredError) {
    statusCode = HTTP_STATUS.UNAUTHORIZED;
    message = "Unauthorized: Token Expired";
  }

  if (err.message === "USER_EXISTED") {
    statusCode = HTTP_STATUS.CONFLICT;
    message = "Email existed!";
  }

  res.error(message, statusCode);
};

module.exports = errorHandler;
