const postModel = require("../models/post.model");
const postsService = require("../services/posts.service");

const getAll = async (req, res) => {
  const page = +req.query.page || 1;
  const result = await postsService.pagination(page, limit = 8);
  res.paginate(result);
};

const getOne = async (req, res) => {
  const id = +req.params.id;
  const post = await postModel.findOne(id);

  if (!post) {
    return res.error({ message: "Post not found" }, 404);
  }
  res.success(post);
};

const createOne = async (req, res) => {
  const { title, slug, description, content } = req.body;
  const newPost = await postModel.insertOne({
    title,
    slug,
    description,
    content,
  });
  res.success(newPost, 201);
};

module.exports = { getAll, getOne, createOne };
