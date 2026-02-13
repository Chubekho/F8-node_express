const userService = require("../services/user.service");

const authController = {
  async register(req, res, next) {
    try {
      const { email, password } = req.body;
      const newUserId = await userService.register(email, password);
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
      const loginData = await userService.login(email, password);

      if (!loginData) return res.error("Unauthorized", 401);

      res.success(loginData.user, 200, loginData.loginToken);
    } catch (err) {
      next(err);
    }
  },
};

module.exports = authController;
