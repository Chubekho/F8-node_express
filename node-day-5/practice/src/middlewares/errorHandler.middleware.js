const { JsonWebTokenError } = require("jsonwebtoken");

const errorHandler = (err, _, res, next) => {
  let status;
  if (err instanceof JsonWebTokenError) {
    err = "Unauthorized";
    status = 401;
  }

  res.error(
    {
      message: String(err),
    },
    status,
  );
};

module.exports = errorHandler;
