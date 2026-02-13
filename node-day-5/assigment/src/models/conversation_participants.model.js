const pool = require("../configs/database");

const conversationParticipantsModel = {
  async insertMany(conversationId, userIds) {
    if (!userIds.length) return;

    const values = userIds.map((userId) => [conversationId, userId]);

    const sql =
      "INSERT INTO conversation_participants(conversation_id, user_id) VALUES ?";

    const [rows] = await pool.query(sql, [values]);
    return rows;
  },
};

module.exports = conversationParticipantsModel;
