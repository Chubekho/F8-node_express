const userService = require("../services/user.service");

const userController = {
  async getAllUsers(_, res, next) {
    try {
      const users = await userService.getAllUsers();
      res.success(users);
    } catch (err) {
      next(err);
    }
  },
};

module.exports = userController;
