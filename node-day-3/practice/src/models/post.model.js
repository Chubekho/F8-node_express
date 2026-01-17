const { loadDB, saveDB } = require("../utils/jsonDB");
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

  async updateOne(id, data) {
    const db = await loadDB("post");
    const index = db.findIndex((post) => post.id === id);

    if (index === -1) return null;

    const updatedPost = {
      ...db[index],
      title: data.title,
      content: data.content,
    };

    db[index] = updatedPost;
    await saveDB("post", db);
    return updatedPost;
  },

  async deleteOne(id) {
    const db = await loadDB("post");
    const index = db.findIndex((post) => post.id === id);

    if (index === -1) return null;

    const deletedPost = db.splice(index, 1);
    await saveDB("post", db);
    return deletedPost;
  },
};

module.exports = postModel;
