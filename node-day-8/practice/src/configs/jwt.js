const jwt = {
  authSecret: process.env.AUTH_JWT_SECRET,
  emailVerifySecret: process.env.VERIFY_JWT_SECRET,
};

module.exports = jwt;
