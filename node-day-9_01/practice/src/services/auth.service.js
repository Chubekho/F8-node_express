const bcrypt = require("bcrypt");
const prisma = require("@/libs/prisma");
const jwt = require("jsonwebtoken");
const constants = require("@/config/constants");
const authConfig = require("@/config/auth");
const generateString = require("../utils/generateString");
const { httpCodes } = constants;

class AuthService {
  async handleRegister(email, password, userAgent) {
    const hash = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        email: email,
        password: hash,
      },
    });

    const userTokens = await this.generateUserTokens(user, userAgent);

    return [null, userTokens];
  }

  async handleLogin(email, password, userAgent) {
    const existedUser = await prisma.user.findUnique({
      where: { email },
    });

    const isMatch = existedUser
      ? await bcrypt.compare(password, existedUser.password)
      : false;

    if (!isMatch) return [true, null];

    const userTokens = await this.generateUserTokens(existedUser, userAgent);

    return [null, userTokens];
  }

  async handleRefreshToken(token, userAgent) {
    const refreshToken = await prisma.refreshToken.findUnique({
      where: {
        token,
        isRevoked: false,
        expiresAt: {
          gt: new Date(),
        },
      },
    });

    if (!refreshToken) return [true, null]; // [isError, data (refreshToken)]

    const user = { id: refreshToken.userId };
    const userTokens = await this.generateUserTokens(user, userAgent);
    await prisma.refreshToken.update({
      where: {
        id: refreshToken.id,
      },
      data: {
        isRevoked: true,
      },
    });
    return [null, userTokens];
  }

  async getUserById(id) {
    const user = await prisma.user.findUnique({
      select: {
        id: true,
        username: true,
        email: true,
        firstName: true,
        lastName: true,
        avatar: true,
        isVerify: true,
        emailVerifyAt: true,
      },
      where: { id },
    });
    return user;
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

  async generateRefreshToken(user, userAgent) {
    let refreshToken,
      existed = false;

    do {
      refreshToken = generateString();
      const count = await prisma.refreshToken.count({
        where: {
          token: refreshToken,
        },
      });

      existed = count > 0;
    } while (existed);

    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + authConfig.refreshTokenTTL);

    await prisma.refreshToken.create({
      data: {
        token: refreshToken,
        userId: user.id,
        userAgent,
        expiresAt,
      },
    });

    return refreshToken;
  }

  async generateUserTokens(user, userAgent) {
    const accessToken = this.generateAccessToken(user);
    const refreshToken = await this.generateRefreshToken(user, userAgent);

    return {
      accessToken,
      accessTokenTTL: authConfig.accessTokenTTL,
      refreshToken,
    };
  }
}

module.exports = new AuthService();
