const jwt = require("jsonwebtoken");
const { secret } = require("../configs/jwt");
const userModel = require("../models/user.model");

const auth = async (req, res, next) => {
  try {
    const bearerToken = req.headers.authorization;

    if (!bearerToken || !bearerToken.startsWith("Bearer ")) {
      throw Error();
    }

    const accessToken = bearerToken.split(" ")[1];

    const payload = jwt.verify(accessToken, secret);

    const currentUser = await userModel.findById(payload.sub);

    if (!currentUser) {
      throw Error();
    }

    req.user = currentUser; 
    req.user.id = payload.sub; 

    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.error("Token has expired", 401);
    }

    return res.error("Unauthorized: " + error.message, 401);
  }
};

module.exports = auth;
