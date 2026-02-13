const BaseService = require("./base.service");
const conversationModel = require("../models/conversation.model");
const conversationParticipantsModel = require("../models/conversation_participants.model");

class ConversationService extends BaseService {
  constructor() {
    super(conversationModel);
  }

  async getAllCurrentUserConversation(userId, page, limit) {
    const condition = { userId };

    return await this.getPagination(page, limit, condition);
  }

  async createConversation(creatorId, name, type, participantIds) {
    if (!participantIds || !Array.isArray(participantIds)) {
      throw new Error("participant_ids must be an array");
    }

    const uniqueParticipants = new Set([...participantIds, creatorId]);
    const finalParticipantIds = Array.from(uniqueParticipants);

    if (type === "direct") {
      if (finalParticipantIds.length !== 2) {
        throw new Error("Direct chat must have exactly 2 participants");
      }
      if (finalParticipantIds.length === 1) {
        throw new Error("Cant chat with urself");
      }
    }

    const conversationId = await conversationModel.insertOne(
      creatorId,
      name,
      type,
    );

    await conversationParticipantsModel.insertMany(
      conversationId,
      finalParticipantIds,
    );
    return conversationId;
  }
}

module.exports = new ConversationService();
