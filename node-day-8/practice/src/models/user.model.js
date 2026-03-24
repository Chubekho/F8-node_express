const pool = require("../configs/database");

const userModel = {
  async findAll() {
    const query = "SELECT id, email, username, verify_at, create_at FROM users";
    const [rows] = await pool.query(query);
    return rows;
  },

  async findById(id) {
    const [rows] = await pool.query(
      "SELECT id, email, username, verify_at, create_at FROM users where id = ? ",
      [id],
    );
    return rows[0];
  },

  async findByEmail(email) {
    const [rows] = await pool.query(
      "SELECT id, email, username, password, verify_at, create_at FROM users where email = ? ",
      [email],
    );
    return rows[0];
  },

  async findByEmailAndPassword(email, password) {
    const [rows] = await pool.query(
      "SELECT id, email, username, verify_at, create_at FROM users WHERE email = ? AND password = ?",
      [email, password],
    );
    return rows[0];
  },

  async countNewUser() {
    const date = new Date();
    date.setDate(date.getDate() - 1);
    const preDate = date.toISOString().slice(0, 10);
    const [rows] = await pool.query(
      "SELECT COUNT(*) AS count FROM users WHERE create_at BETWEEN ? AND ?", [`${preDate} 00:00:00`, `${preDate} 23:59:59`]
    );
    return rows[0].count
  },

  async createOne(email, password) {
    const [rows] = await pool.query(
      "INSERT INTO users(email, password) VALUES (?, ?)",
      [email, password],
    );
    return rows.insertId;
  },

  async updateRefreshToken(id, token, ttl) {
    const query =
      "UPDATE users SET refresh_token = ?, refresh_expires_at = ? WHERE id = ?";
    const [{ affectedRows }] = await pool.query(query, [token, ttl, id]);

    return affectedRows;
  },

  async findByRefreshToken(token) {
    const query =
      "SELECT * FROM users WHERE refresh_token = ? AND refresh_expires_at > NOW()";
    const [rows] = await pool.query(query, [token]);
    return rows.verify_at;
  },

  async updateVerifyAt(id) {
    const query = "UPDATE users SET verify_at = now() WHERE id = ?";
    const [{ affectedRows }] = await pool.query(query, [id]);
    return affectedRows;
  },
};

module.exports = userModel;
