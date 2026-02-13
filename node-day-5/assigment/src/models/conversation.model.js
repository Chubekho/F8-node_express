// src/models/conversation.model.js
const pool = require("../configs/database");

const conversationModel = {
  async findAll(offset, limit, condition) {
    const { userId } = condition;

    const query = `
      SELECT id, name, type, create_at 
      FROM conversations 
      WHERE id IN (
        SELECT conversation_id FROM conversation_participants WHERE user_id = ?
      )
      LIMIT ? OFFSET ?
    `;

    const [rows] = await pool.query(query, [userId, limit, offset]);
    return rows;
  },

  async insertOne(create_by, name, type) {
    const [rows] = await pool.query(
      "INSERT INTO conversations(created_by, name, type) VALUES (?, ?, ?)",
      [create_by, name, type],
    );
    return rows.insertId;
  },

  async count(condition) {
    const { userId } = condition;

    const sql = `
      SELECT COUNT(*) as total 
      FROM conversations 
      WHERE id IN (
        SELECT conversation_id FROM conversation_participants WHERE user_id = ?
      )
    `;

    const [rows] = await pool.query(sql, [userId]);
    return rows[0].total;
  },
};

module.exports = conversationModel;
