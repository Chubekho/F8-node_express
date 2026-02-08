const jwt = require("jsonwebtoken");

const userModel = require("../models/user.model");

const register = async (req, res) => {
  const { email, password } = req.body;

  const insertId = await userModel.createOne(email, password);
  const newUser = {
    id: insertId,
    email,
  };

  res.success(newUser, 201);
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await userModel.findUserByEmailAndPassword(email, password);

  if (!user) {
    return res.error("Unauthorize", 401);
  }

  const payload = {
    sub: user.id,
    exp: Date.now() + 3600 * 1000,
  };
  const { secret } = require("../configs/jwt");
  const token = jwt.sign(payload, secret);

  res.success(user, 201, {
    access_token: token,
    access_token_ttl: 3600,
  });
};

const getCurrentUser = async (req, res) => {
  res.success(req.user);
};

module.exports = { register, login, getCurrentUser };
