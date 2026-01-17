const postModel = require("../models/post.model");

const getAll = async (req, res) => {
  const posts = await postModel.findAll();
  res.success(posts);
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
  const newPost = await postModel.insertOne({ title, slug, description, content });
  res.success(newPost, 201);
};

const editOne = async (req, res) => {
  const id = +req.params.id;
  const { title, content } = req.body;

  const updatedPost = await postModel.updateOne(id, { title, content });

  if (!updatedPost) {
    return res.error({ message: "Post not found" }, 404);
  }

  res.success(updatedPost);
};

const deleteOne = async (req, res) => {
  const id = +req.params.id;
  const deletedPost = await postModel.deleteOne(id);

  if (!deletedPost) {
    return res.error({ message: "Post not found" }, 404);
  }
  res.success(null, 204);
};

module.exports = { getAll, getOne, createOne, editOne, deleteOne };
