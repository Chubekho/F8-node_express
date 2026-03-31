const { accessTokenTTL } = require("@/config/auth");
const authService = require("@/services/auth.service");

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await authService.register(email, password);
  const accessToken = authService.generateAccessToken(user);

  res.success(
    {
      accessTokenTTL,
      accessToken,
    },
    201,
  );
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const userLoginData = await authService.login(email, password);

  res.success(userLoginData, 200);
};

const getCurrentUser = async (req, res) => {
  res.success(req.auth.user);
};

module.exports = { register, login, getCurrentUser };
