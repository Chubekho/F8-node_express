const authConfig = {
  accessTokenTTL: process.env.AUTH_ACCESS_TOKEN_TTL || '1h',
  jwtSecret: process.env.AUTH_JWT_SECRET,
};

module.exports = authConfig;
