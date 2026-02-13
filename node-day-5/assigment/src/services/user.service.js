const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");

class UserService {
  model = userModel;

  async register(email, password) {
    const existingUser = await userModel.findByEmail(email);

    if (existingUser) {
      throw new Error("USER_EXISTED");
    }

    return await userModel.createOne(email, password);
  }

  async login(email, password) {
    const user = await userModel.findByEmailAndPassword(email, password);
    if (!user) return null;

    const token = jwt.sign({ sub: user.id }, secret, { expiresIn: "1h" });

    return {
      user,
      loginToken: { access_token: token, access_token_ttl: 3600 },
    };
  }
}

module.exports = new UserService();
