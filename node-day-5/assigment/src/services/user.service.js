const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");

class UserService {
  model = userModel;

  async register(email, password) {
    const existingUser = await userModel.findByEmail(email);

    if (existingUser) {
      return null;
    }

    const newUserId = await userModel.createOne(email, password);
    return newUserId;
  }

  async login(email, password) {
    let loginData = {};
    const user = await userModel.findByEmailAndPassword(email, password);
    if (!user) {
      return loginData;
    }

    const payload = {
      sub: user.id,
      exp: Date.now() + 3600 * 1000,
    };

    const { secret } = require("../configs/jwt");
    const token = jwt.sign(payload, secret);
    loginData.user = user;
    loginData.loginToken = {
      access_token: token,
      access_token_ttl: 3600,
    };

    return loginData;
  }
}

module.exports = new UserService();
