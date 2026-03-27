const errorHandle = (error, req, res, next) => {
    console.log(error.message);
    
  res.error(error.message, error.statusCode);
};

module.exports = errorHandle;
