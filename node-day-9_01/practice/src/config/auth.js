const authConfig = {
  jwtSecret: process.env.AUTH_JWT_SECRET,
  accessTokenTTL: process.env.AUTH_ACCESS_TOKEN_TTL || '1h',
  refreshTokenTTL: +process.env.AUTH_REFRESH_TOKEN_TTL || 7
};

module.exports = authConfig;
