const constants = require("@/config/constants");
const { httpCodes, prismaCode } = constants;
const isProdution = require("@/utils/isProduction");

const {
  PrismaClientValidationError,
} = require("@prisma/client/runtime/client.js");
const { JsonWebTokenError, TokenExpiredError } = require("jsonwebtoken");

const errorHandle = (err, req, res, next) => {
  let statusCode = err.statusCode || httpCodes.internalServerError;
  let message = err.message || "Internal Server Error";

  if (isProdution()) {
    res.error("Server Error", httpCodes.internalServerError);
  }

  if (err instanceof PrismaClientValidationError) {
    message = String(err);
  }

  if (err instanceof JsonWebTokenError) {
    statusCode = httpCodes.unauthorized;
    message = "Unauthorized: Invalid Token";
  }

  if (err instanceof TokenExpiredError) {
    statusCode = httpCodes.unauthorized;
    message = "Unauthorized: Token Expired";
  }  

  if (err.code === prismaCode.duplicate) {
    statusCode = httpCodes.conflict;
    message = "Duplicate Entry";
  }

  res.error(message, statusCode);
};

module.exports = errorHandle;
