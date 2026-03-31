const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../config/auth");
const prisma = require("../libs/prisma");
const userService = require("../services/user.service");
const authService = require("../services/auth.service");

const authRequire = async (req, res, next) => {
  const bearerToken = req.headers.authorization;

  if (!bearerToken || !bearerToken.startsWith("Bearer ")) res.unauthorized();

  const accessToken = bearerToken.split(" ")[1];

  const payload = jwt.verify(accessToken, jwtSecret);
  const user = await authService.getUserById(payload.sub);
  if (!user) res.unauthorized();

  const { password, ...safeUserData } = user;

  req.auth = {
    user: safeUserData,
  };

  next();
};

module.exports = authRequire;
