const conversationService = require("../services/conversation.service");

const conversationController = {
  async getAllCurrentUserConversation(req, res) {
    const currentUserId = req.user.id; 
    const { page, limit } = req.query;

    const result = await conversationService.getAllCurrentUserConversation(
      currentUserId,
      page,
      limit,
    );

    res.success(result, 200);
  },
};

module.exports = conversationController;
