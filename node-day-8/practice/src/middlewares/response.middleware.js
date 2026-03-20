const response = (_, res, next) => {
  res.success = (data, statusCode = 200, passProp) => {
    res.status(statusCode).json({
      status: "success",
      data,
      ...passProp,
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
};

module.exports = response;
