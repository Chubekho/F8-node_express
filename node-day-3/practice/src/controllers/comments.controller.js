const commentModel = require("../models/comment.model");

const getAll = async (req, res) => {
  const comments = await commentModel.findAll();
  res.status(200).json(comments);
};

const getOne = async (req, res) => {
  const id = +req.params.id;
  const comment = await commentModel.findOne(id);
  if (!comment) return res.status(404).json({ message: "comment not found" });
  res.status(200).json(comment);
};

const createOne = async (req, res) => {
  const { postId, content } = req.body;
  const newComment = await commentModel.insertOne({ postId, content });
  res.status(201).json(newComment);
};

const editOne = async (req, res) => {
  const id = +req.params.id;
  const { content } = req.body;

  const updatedComment = await commentModel.updateOne(id, { content });

  if (!updatedComment)
    return res.status(404).json({ message: "Comment not found" });

  res.status(200).json(updatedComment);
};

const deleteOne = async (req, res) => {
  const id = +req.params.id;
  const deletedComment = await commentModel.deleteOne(id);

  if (!deletedComment)
    return res.status(404).json({ message: "Comment not found" });

  res.status(204).end();
};

module.exports = { getAll, getOne, createOne, editOne, deleteOne };
