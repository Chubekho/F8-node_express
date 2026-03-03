const pool = require("../configs/database");

const userModel = {
  async createOne(email, password) {
    const [rows] = await pool.query(
      "INSERT INTO users(email, password) VALUES (?, ?)",
      [email, password],
    );
    return rows.insertId;
  },

  async findById(id) {
    const [rows] = await pool.query(
      "SELECT id, email, create_at FROM users where id = ? ",
      [id],
    );
    return rows[0];
  },

  async findByEmail(email) {
    const [rows] = await pool.query(
      "SELECT id, password, email, create_at FROM users where email = ? ",
      [email],
    );
    return rows[0];
  },

  async findByEmailAndPassword(email, password) {
    const [rows] = await pool.query(
      "SELECT id, email, create_at FROM users WHERE email = ? AND password = ?",
      [email, password],
    );
    return rows[0];
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
    return rows[0];
  },
};

module.exports = userModel;
