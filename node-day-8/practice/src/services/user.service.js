const userModel = require("../models/user.model");
const queueService = require("./queue.service");

class UserService {
  async getAllUsers() {
    const users = userModel.findAll();
    queueService.push({
      type: "demoHeavy",
    });
    return users;
  }
}

module.exports = new UserService();
