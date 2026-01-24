const errorHandler = (err, _, res, next) => {
  res.error(
    {
      message: String(err),
    },
    500
  );
};

module.exports = errorHandler;
