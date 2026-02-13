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

  async createConversation(req, res, next) {
    try {
      const creatorId = req.user.id;
      const { name, type, participant_ids } = req.body;

      // Gọi service với đúng thứ tự tham số
      const conversationId = await conversationService.createConversation(
        creatorId,
        name,
        type,
        participant_ids,
      );

      // Trả về kết quả
      res.success(
        {
          conversationId,
          name,
          type,
          totalParticipants: participant_ids.length + 1, // tính cả người tạo
        },
        201,
      );
    } catch (error) {
      next(error);
    }
  },
};

module.exports = conversationController;
