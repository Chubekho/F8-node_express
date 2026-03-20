const { HTTP_STATUS } = require("../configs/constants");
const authService = require("../services/auth.service");

const authController = {
  async register(req, res, next) {
    try {
      const { email, password } = req.body;
      const newUserId = await authService.register(email, password);
      res.success({ id: newUserId, email }, HTTP_STATUS.CREATED);
    } catch (err) {
      next(err);
    }
  },

  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const loginData = await authService.login(email, password);

      res.success(loginData.safeUserData, HTTP_STATUS.OK, loginData.loginToken);
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
      res.success(refreshData.loginToken, HTTP_STATUS.OK);
    } catch (err) {
      next(err);
    }
  },

  async verifyEmail(req, res, next) {
    try {
      const token = req.body.token;
      if (!token) {
        throw new Error("Invalid token");
      }

      const message = await authService.verifyEmail(token);
      res.success(message);
    } catch (err) {
      next(err);
    }
  },

  async resendVerifyEmail(req, res, next) {
    try {
      const user = req.user;
      const message = await authService.resendVerifyEmail(user);
      res.success(message)
    } catch (err) {
      next(err);
    }
  },
};

module.exports = authController;
