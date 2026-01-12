const postModel = require("../models/post.model");

const getAll = async (req, res) => {
  const posts = await postModel.findAll();
  res.status(200).json(posts);
};

const getOne = async (req, res) => {
  const id = +req.params.id;
  const post = await postModel.findOne(id);

  if (!post) {
    return res.status(404).json({ message: "Post not found" });
  }
  res.status(200).json(post);
};

const createOne = async (req, res) => {
  const { title, content } = req.body;
  const newPost = await postModel.create({ title, content });
  res.status(201).json(newPost);
};

const editOne = async (req, res) => {
  const id = +req.params.id;
  const { title, content } = req.body;

  const updatedPost = await postModel.editOne(id, { title, content });

  if (!updatedPost) {
    return res.status(404).json({ message: "Post not found!" });
  }

  res.status(200).json(updatedPost);
};

const delOne = async (req, res) => {
  const id = +req.params.id;
  const deletedPost = await postModel.delOne(id);
  
  if (!deletedPost) {
    return res.status(404).json({ message: "Post not found!" });
  }
  res.status(204).end();
};

module.exports = { getAll, getOne, createOne, editOne, delOne };
