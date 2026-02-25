// const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userModel = require("../models/user.model");
const { secret } = require("../configs/jwt");
const jwt2 = require("../utils/jwt2");

const saltRounds = 10;

class AuthService {
  model = userModel;

  async register(email, plaintextPassword) {
    const existingUser = await userModel.findByEmail(email);

    if (existingUser) {
      throw new Error("USER_EXISTED");
    }

    const hashedPassword = await bcrypt.hash(plaintextPassword, saltRounds);
    const newUserId = await userModel.createOne(email, hashedPassword);

    return newUserId;
  }

  async login(email, plainPassword) {
    const user = await userModel.findByEmail(email);

    const isMatch = user
      ? await bcrypt.compare(plainPassword, user.password)
      : false;

    if (!isMatch) {
      const error = new Error("Wrong email or password");
      error.statusCode = 401;
      throw error;
    }

    const header = {
      alg: "HS256",
      typ: "JWT",
    };

    const TTL_SECONDS = 300; // 5 phút
    const now = Math.floor(Date.now() / 1000);

    const payload = {
      sub: user.id,
      iat: now,
      exp: now + TTL_SECONDS, // 5phut
    };

    const token2 = jwt2.sign(header, payload, secret);
    // const token = jwt.sign({ sub: user.id }, secret, { expiresIn: "5m" });

    const { password, ...userWithoutPassword } = user;

    return {
      userWithoutPassword,
      loginToken: { access_token: token2, access_token_ttl: TTL_SECONDS },
    };
  }
}

module.exports = new AuthService();
