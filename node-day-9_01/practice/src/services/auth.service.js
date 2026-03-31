const bcrypt = require("bcrypt");
const prisma = require("@/libs/prisma");
const jwt = require("jsonwebtoken");
const constants = require("@/config/constants");
const authConfig = require("@/config/auth");
const { httpCodes } = constants;

class AuthService {
  async register(email, password) {
    const hash = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        email: email,
        password: hash,
      },
    });
    const { password: newPassword, ...newUserData } = user;

    return newUserData;
  }

  generateAccessToken(user) {
    const accessToken = jwt.sign(
      {
        sub: user.id,
      },
      authConfig.jwtSecret,
      { expiresIn: authConfig.accessTokenTTL },
    );

    return accessToken;
  }

  async login(email, password) {
    const existedUser = await prisma.user.findUnique({
      where: { email },
    });

    const isMatch = existedUser
      ? await bcrypt.compare(password, existedUser.password)
      : false;

    if (!isMatch) {
      const error = new Error("Unathorized");
      error.statusCode = httpCodes.unauthorized;
      throw error;
    }

    const { password: newPassword, ...newUserData } = existedUser;

    return newUserData;
  }
}

module.exports = new AuthService();
