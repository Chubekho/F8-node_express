const pool = require("../configs/database");

const userModel = {
  async findOne(id) {
    const [rows] = await pool.query("select id, email, create_at from users where id = ?", [id]);
    return rows[0];
  },

  async createOne(email, password) {
    const [rows] = await pool.query(
      "INSERT INTO users (email, password) VALUES (?, ?)",
      [email, password],
    );
    return rows.insertId;
  },

  async findUserByEmailAndPassword(email, password) {
    const [rows] = await pool.query(
      "SELECT id, email, create_at FROM users WHERE email = ? AND password = ?",
      [email, password],
    );
    return rows[0];
  },
};

module.exports = userModel;
