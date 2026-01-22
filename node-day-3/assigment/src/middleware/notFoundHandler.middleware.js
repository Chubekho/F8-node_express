const notFoundHandler = (req, res, next) => {
  const err = `Cannot ${req.method} ${req.originalUrl}`
  res.error(404, "Resource not found", err);
};

module.exports = notFoundHandler;
