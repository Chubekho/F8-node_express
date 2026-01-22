const exceptionHander = (err, _ , res, next) => {
  console.error(err.stack);
  res.error(500, err.message, err);
};

module.exports = exceptionHander;
