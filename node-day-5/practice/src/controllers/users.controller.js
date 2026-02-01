const userModel = require("../models/user.model");
const postModel = require("../models/post.model")
const usersService = require("../services/users.service");

const getAll = async (req, res) => {
  const page = +req.query.page || 1;
  const result = await usersService.pagination(page, 10, {});
  res.paginate(result);
};

const getUserPosts = async (req, res) => {
  const userId = +req.params.id;
  let userPosts = await postModel.findPostByUserId(userId);
  res.success(userPosts);
};

const getOne = async (req, res) => {
  const id = +req.params.id;
  const user = await userModel.findOne(id);

  if (!user) {
    return res.error({ message: "user not found" }, 404);
  }
  res.success(user);
};

const createOne = async (req, res) => {
  const { title, slug, description, content } = req.body;
  const newuser = await userModel.insertOne({
    title,
    slug,
    description,
    content,
  });
  res.success(newuser, 201);
};

module.exports = { getAll, getUserPosts, getOne, createOne };
