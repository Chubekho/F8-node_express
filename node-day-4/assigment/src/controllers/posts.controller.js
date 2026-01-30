const postsService = require("../services/posts.service");

const getAll = async (req, res) => {
  const page = req.query.page || 1;
  const result = await postsService.pagination(page, {
    limit: req.query.limit,
    user_id: req.query.user_id,
  });
  res.paginate(result);
};

module.exports = { getAll };
