const pool = require("../config/database");

const userModel = {
  async findAll(limit, offset) {
    
    const [rows] = await pool.query(
      "SELECT * FROM users limit ? offset ?",
      [limit, offset],
    );
    return rows;
  },

  async findOne(id) {
    const [rows] = await pool.query("select * from users where id = ?", [id]);
    return rows[0];
  },

  async insertOne(data) {
    try {
      const result = await pool.query(
        "INSERT INTO users (title, slug, description, content) VALUES (?, ?, ?, ?);",
        [data.title, data.slug, data.description, data.content],
      );
      return result;
    } catch (e) {
      throw new Error(e);
    }
  },

  async count() {
    const [rows] = await pool.query(`SELECT COUNT(*) AS count FROM users;`);
    return rows[0].count;
  },
};

module.exports = userModel;
