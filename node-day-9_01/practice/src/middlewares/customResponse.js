const constants = require("@/config/constants");
const { httpCodes } = constants;

function customResponse(req, res, next) {
  res.success = (data, status = httpCodes.ok) => {
    res.status(status).json({
      status: "success",
      data,
    });
  };
  res.error = (message, status = httpCodes.internalServerError) => {
    res.status(status).json({
      status: "error",
      message,
    });
  };
  next();
}

module.exports = customResponse;
