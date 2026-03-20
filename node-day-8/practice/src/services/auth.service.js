// const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userModel = require("../models/user.model");
const emailService = require("./email.service");
const { authSecret, emailVerifySecret } = require("../configs/jwt");
const jwt2 = require("../utils/jwt2");
const strings = require("../utils/strings");
const {
  BCRYPT_SALT_ROUNDS,
  HTTP_STATUS,
  ACCESS_TOKEN_TTL_SECONDS,
  REFRESH_TOKEN_TTL_DAYS,
} = require("../configs/constants");
const queueService = require("./queue.service");

const saltRounds = BCRYPT_SALT_ROUNDS;

class AuthService {
  model = userModel;

  async register(email, plaintextPassword) {
    const existingUser = await userModel.findByEmail(email);

    if (existingUser) {
      const error = new Error("Email existed");
      error.statusCode = HTTP_STATUS.CONFLICT;
      throw error;
    }

    const hashedPassword = await bcrypt.hash(plaintextPassword, saltRounds);
    const newUserId = await userModel.createOne(email, hashedPassword);
    const newUser = {
      id: newUserId,
      email,
    };

    // await emailService.sendVerifyEmail(newUser);
    queueService.push({
      type: "sendVerifyEmail",
      payload: newUser,
    });

    return newUserId;
  }

  async login(email, plainPassword) {
    const user = await userModel.findByEmail(email);
    const isMatch = user
      ? await bcrypt.compare(plainPassword, user.password)
      : false;

    if (!isMatch) {
      const error = new Error("Wrong email or password");
      error.statusCode = HTTP_STATUS.UNAUTHORIZED;
      throw error;
    }

    return await responseWithToken(user);
  }

  async refreshToken(token) {
    const user = await userModel.findByRefreshToken(token);
    if (!user) {
      const error = new Error("Unauthorized");
      error.statusCode = HTTP_STATUS.UNAUTHORIZED;
      throw error;
    }

    return await responseWithToken(user);
  }

  async verifyEmail(token) {
    const payload = jwt2.verify(token, emailVerifySecret);
    const user = await userModel.findById(payload.sub);

    if (user.verify_at) {
      const error = new Error("Email has been verified");
      error.statusCode = HTTP_STATUS.CONFLICT;
      throw error;
    }
    const now = new Date(Date.now());

    await userModel.updateVerifyAt(payload.sub, now);
    return "Email verified successfully";
  }

  async resendVerifyEmail(user) {
    if (user.verify_at) {
      const error = new Error("Email has been verified");
      error.statusCode = HTTP_STATUS.CONFLICT;
      throw error;
    }

    await emailService.sendVerifyEmail(user);
    return "A verification email has been sent to your email";
  }
}

const responseWithToken = async (user) => {
  const now = Math.floor(Date.now() / 1000); // in seconds

  const payload = {
    sub: user.id,
    iat: now,
    exp: now + ACCESS_TOKEN_TTL_SECONDS,
  };

  const accessToken = jwt2.sign(payload, authSecret);
  // const token = jwt.sign({ sub: user.id }, secret, { expiresIn: "15s" });
  const refreshToken = strings.createRandomString(20);
  const refreshTokenTTL = 60 * 60 * 24 * REFRESH_TOKEN_TTL_DAYS; // 30days
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
      access_token_ttl: ACCESS_TOKEN_TTL_SECONDS,
      refresh_token: refreshToken,
      refresh_token_ttl: refreshTokenTTL,
    },
  };
};

module.exports = new AuthService();
