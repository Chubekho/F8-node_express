const userService = require("../services/user.service");

const authController = {
  async register(req, res) {
    const { email, password } = req.body;
    const newUserId = await userService.register(email, password);
    if (!newUserId) {
      return res.error("Email existed!", 409);
    }
    const newUser = {
      id: newUserId,
      email,
    };
    res.success(newUser, 201);
  },

  async login(req, res) {
    const { email, password } = req.body;
    const loginData = await userService.login(email, password);
    if (!loginData.user) {
      return res.error("Unauthorized", 401);
    }
    res.success(loginData.user, 200, loginData.loginToken);
  },
};

module.exports = authController;
