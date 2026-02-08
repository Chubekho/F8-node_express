const jwt = require("jsonwebtoken");
const { secret } = require("../configs/jwt");
const userModel = require("../models/user.model");

const authRequired = async (req, res, next) => {
  const accessToken = req.headers.authorization.split(" ")[1];
  const payload = jwt.verify(accessToken, secret);

  // check exp
  if(payload.exp < Date.now()) {
    res.error("Unauthorized", 401)
  }

  // get current user
  const currentUser = await userModel.findOne(payload.sub);
  req.user = currentUser;

  next();
};

module.exports = authRequired;
