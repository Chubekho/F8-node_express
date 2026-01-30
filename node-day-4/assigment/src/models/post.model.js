const pool = require("../config/database");

const postModel = {
  async findAll(offset, limit, condition = {}) {
    const queryStr = Object.entries(condition)
      .filter(([key, value]) => value !== void 0 && key !== 'limit')
      .map(([key, value]) => {
        return `${key} = ${value}`;
      })
      .join(" AND ");
    
    const [rows] = await pool.query(
      `SELECT * FROM posts ${queryStr ? `where ${queryStr} ` : ""} limit ? offset ?;`,
      [limit, offset],
    );
    return rows;
  },

  async count() {
    const [rows] = await pool.query("SELECT COUNT(*) as count FROM posts;");
    return rows[0].count;
  },
};

module.exports = postModel;
