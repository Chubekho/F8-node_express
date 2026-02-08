const notFound = (req, res) => {
  res.error(
    {
      message: `Can not ${req.method} ${req.url}`,
    },
    404,
  );
};

module.exports = notFound;
