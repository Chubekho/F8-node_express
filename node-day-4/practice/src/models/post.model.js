const pool = require("../config/database");

const postModel = {
  async findAll() {
    const [rows] = await pool.query("SELECT * FROM posts")
    return rows;
  },

  async findOne(id) {
    const [rows] = await pool.query(`select * from posts where id = ${id}`);
    return rows[0]
  },

  async insertOne(data) {
    try {
      const result = await pool.query(`INSERT INTO posts (title, slug, description, content) VALUES ("${data.title}", "${data.slug}", "${data.description}", "${data.content}");`)
      return result;
    } catch(e) {
      throw new Error(e)
    }
  },
};

module.exports = postModel;
