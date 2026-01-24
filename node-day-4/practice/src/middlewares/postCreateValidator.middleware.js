const postCreateValidator = (req, res, next) => {
  const { title } = req.body;
  if (!title) {
    return res.error(
      {
        message: "title can not be empty",
      },
      422
    );
  }

  if (title.length < 2) {
    return res.error(
      {
        message: "title can not shorter than 2 characters",
      },
      422
    );
  }

  if (title.length > 50) {
    return res.error(
      {
        message: "title can not longer than 50 characters",
      },
      422
    );
  }

  next();
};

module.exports = postCreateValidator;
