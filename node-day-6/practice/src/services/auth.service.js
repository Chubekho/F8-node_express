const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");
const { secret } = require("../configs/jwt");
const jwt2 = require("../utils/jwt2");

class AuthService {
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

    const header = {
      alg: "HS256",
      typ: "JWT",
    };
     
    const payload = {
      sub: user.id,
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000 + 300), // 5phut
    };

    const token2 = jwt2.sign(header, payload, secret);

    const token = jwt.sign({ sub: user.id }, secret, { expiresIn: "5m" });

    return {
      user,
      loginToken: { access_token: token2, access_token_ttl: 3600 },
    };
  }
}

module.exports = new AuthService();
