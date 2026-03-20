const pool = require("../configs/database");

const queueModel = {
  async findAllPending() {
    const [rows] = await pool.query(
      "SELECT * FROM queues WHERE status = 'pending';",
    );
    return rows;
  },

  async findOnePending() {
    const [rows] = await pool.query(
      "SELECT * FROM queues  WHERE status = 'pending' LIMIT 1",
    );
    return rows[0];
  },

  async createOne(type, payload) {
    const [rows] = await pool.query(
      "INSERT INTO queues(type, payload) VALUES (?, ?)",
      [type, payload],
    );
    return rows.insertId;
  },
  async updateQueueStatus(id, status) {
    const query = "UPDATE queues SET status = ? WHERE id = ?";
    const [{ affectedRows }] = await pool.query(query, [status, id]);
    return affectedRows;
  },
};

module.exports = queueModel;
