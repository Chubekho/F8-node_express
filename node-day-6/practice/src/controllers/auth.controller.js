const authService = require("../services/auth.service");


const authController = {
  async register(req, res, next) {
    try {
      const { email, password } = req.body;
      const newUserId = await authService.register(email, password);
      // res.success({ id: newUserId, email }, 201);
      res.success(newUserId, 201)
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

      if (!loginData) return res.error("Unauthorized", 401);
      
      res.success(loginData.userWithoutPassword, 200, loginData.loginToken);
    } catch (err) {
      next(err);
    }
  },

  async getCurrentUser(req, res) {
    res.success(req.user);
  },
};

module.exports = authController;
