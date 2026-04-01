const { accessTokenTTL, refreshTokenTTL } = require("@/config/auth");
const authService = require("@/services/auth.service");

const register = async (req, res) => {
  const { email, password } = req.body;
  const [error, userTokens] = await authService.handleRegister(
    email,
    password,
    req.headers["user-agent"],
  );
  if (error) res.unauthorized();

  res.success(userTokens, 201);
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const [error, userTokens] = await authService.handleLogin(
    email,
    password,
    req.headers["user-agent"],
  );
  if (error) res.unauthorized();

  res.success(userTokens, 200);
};

const refreshToken = async (req, res) => {
  const token = req.body.refreshToken;
  if (!token) return res.unauthorized();

  const [error, userTokens] = await authService.handleRefreshToken(
    token,
    req.headers["user-agent"],
  );
  if (error) res.unauthorized();

  res.success(userTokens);
};

const getCurrentUser = async (req, res) => {
  res.success(req.auth.user);
};

module.exports = { register, login, getCurrentUser, refreshToken };
