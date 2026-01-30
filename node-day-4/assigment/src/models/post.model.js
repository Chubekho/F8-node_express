const pool = require("../config/database");

const postModel = {
  async findAll(offset, limit, condition = {}) {
    const [rows] = await pool.query("SELECT * FROM posts limit ? offset ?;", [
      limit,
      offset,
    ]);
    return rows;
  },

  async count() {
    const [rows] = await pool.query("SELECT COUNT(*) FROM posts;");
    return rows[0];
  },
};

module.exports = postModel;
