const BaseService = require("./base.service");
const conversationModel = require("../models/conversation.model");

class ConversationService extends BaseService {
  constructor() {
    super(conversationModel);
  }

  async getAllCurrentUserConversation(userId, page, limit) {
    const condition = { userId };

    return await this.getPagination(page, limit, condition);
  }
}

module.exports = new ConversationService();
