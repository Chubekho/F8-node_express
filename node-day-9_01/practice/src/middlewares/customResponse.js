const constants = require("@/config/constants");
const { httpCodes } = constants;

function customResponse(req, res, next) {
  res.success = (data, status = httpCodes.ok) => {
    res.status(status).json({
      status: "success",
      data,
    });
  };
  
  res.error = (message, statusCode = 500, errorDetails = null) => {
    const responseData = {
      status: "error",
      message,
    };

    if (errorDetails) {
      responseData.error = errorDetails;
    }

    res.status(statusCode).json(responseData);
  };

  next();
}

module.exports = customResponse;
