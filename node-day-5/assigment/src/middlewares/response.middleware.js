const response = (_, res, next) => {
  res.success = (data, statusCode = 200, passProp) => {
    res.status(statusCode).json({
      status: "success",
      data,
      ...passProp,
    });
  };

  res.error = (error, statusCode = 500) => {
    res.status(statusCode).json({
      status: "error",
      error,
    });
  };
  next();
};

module.exports = response;
