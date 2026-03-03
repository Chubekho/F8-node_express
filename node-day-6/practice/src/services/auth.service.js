// const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userModel = require("../models/user.model");
const { secret } = require("../configs/jwt");
const jwt2 = require("../utils/jwt2");
const strings = require("../utils/strings");

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

    return await responseWithToken(user);
  }

  async refreshToken(token) {
    const user = await userModel.findByRefreshToken(token);
    if (!user) {
      const error = new Error("Unauthorized");
      error.statusCode = 401;
      throw error;
    }

    return await responseWithToken(user);
  }
}

const responseWithToken = async (user) => {
  const TTL_SECONDS = 15; // 15s
  const now = Math.floor(Date.now() / 1000); //in seconds

  const payload = {
    sub: user.id,
    iat: now,
    exp: now + TTL_SECONDS, // 15s
  };

  const accessToken = jwt2.sign(payload, secret);
  // const token = jwt.sign({ sub: user.id }, secret, { expiresIn: "15s" });
  const refreshToken = strings.createRandomString(20);
  const refreshTokenTTL = 60 * 60 * 24 * 30; // 30days
  const refreshTokenExpiresAt = new Date(Date.now() + refreshTokenTTL * 1000);

  await userModel.updateRefreshToken(
    user.id,
    refreshToken,
    refreshTokenExpiresAt,
  );

  const { password, ...safeUserData } = user;

  return {
    safeUserData,
    loginToken: {
      access_token: accessToken,
      access_token_ttl: TTL_SECONDS,
      refresh_token: refreshToken,
      refresh_token_ttl: refreshTokenTTL,
    },
  };
};

module.exports = new AuthService();
