const userModel = require("../models/user.model");
const authService = require("../services/auth.service");

const authController = {
  async register(req, res, next) {
    try {
      const { email, password } = req.body;
      const newUserId = await authService.register(email, password);
      res.success({ id: newUserId, email }, 201);
    } catch (err) {
      if (err.message === "USER_EXISTED")
        return res.error("Email existed!", 409);
      next(err);
    }
  },

  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const loginData = await authService.login(email, password);

      res.success(loginData.safeUserData, 200, loginData.loginToken);
    } catch (err) {
      next(err);
    }
  },

  async getCurrentUser(req, res) {
    res.success(req.user);
  },

  async refreshToken(req, res, next) {
    try {
      const refreshToken = req.body.refresh_token;
      const refreshData = await authService.refreshToken(refreshToken);
      res.success(refreshData.loginToken, 200);
    } catch (error) {
      next(error);
    }
  },
};

module.exports = authController;
