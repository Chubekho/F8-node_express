const jwt = require("jsonwebtoken");
const jwt2 = require("../utils/jwt2");
const { authSecret } = require("../configs/jwt");
const userModel = require("../models/user.model");

const auth = async (req, res, next) => {
  const bearerToken = req.headers.authorization;

  if (!bearerToken || !bearerToken.startsWith("Bearer ")) {
    throw Error("Invalid token");
  }

  const accessToken = bearerToken.split(" ")[1];
  const payload = jwt2.verify(accessToken, secret);
  const currentUser = await userModel.findById(payload.sub);

  if (!currentUser) {
    const error = new Error();
    error.message = "resource not found";
    error.statusCode = 404;
    throw error;
  }

  req.user = currentUser;
  req.user.id = payload.sub;

  next();
};

module.exports = auth;
