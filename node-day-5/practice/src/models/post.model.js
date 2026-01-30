const pool = require("../config/database");

const postModel = {
  async findAll(limit, offset, condition = {}) {
    const queryStr = Object.entries(condition)
      .filter(([_, value]) => value !== void 0)
      .map(([key, value]) => {
        return `${key}=${value}`
      })
      .join(" AND ")

      // console.log(`SELECT * FROM posts ${queryStr ? `where ${queryStr}` : ""} limit ${limit} offset ${offset}`);
    const [rows] = await pool.query(
      `SELECT * FROM posts ${queryStr ? `where ${queryStr}` : ""} limit ? offset ?`,
      [limit, offset],
    );
    return rows;
  },

  async findOne(id) {
    const [rows] = await pool.query("select * from posts where id = ?", [id]);
    return rows[0];
  },

  async insertOne(data) {
    try {
      const result = await pool.query(
        "INSERT INTO posts (title, slug, description, content) VALUES (?, ?, ?, ?);",
        [data.title, data.slug, data.description, data.content],
      );
      return result;
    } catch (e) {
      throw new Error(e);
    }
  },

  async count() {
    const [rows] = await pool.query(`SELECT COUNT(*) AS count FROM posts;`);
    return rows[0].count;
  },
};

module.exports = postModel;
