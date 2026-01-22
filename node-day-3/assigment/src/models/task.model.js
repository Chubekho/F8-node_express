const pool = require("../config/database");

const taskModel = {
  async findAll() {
    const [rows] = await pool.query(`SELECT * FROM tasks`);
    return rows;
  },
  async findOne(id) {
    const [rows] = await pool.query("SELECT * FROM tasks WHERE id = ?", [id]);
    return rows[0];
  },
  async create(taskData) {
    return await pool.query(
      "INSERT INTO tasks (title, completed) VALUES (?, ?)",
      [taskData.title, taskData.completed || false],
    );
  },
  async update(id, taskData) {
    return await pool.query(
      "UPDATE tasks SET title = ?, completed = ? WHERE id = ?",
      [taskData.title, taskData.completed, id],
    );
  },
  async destroy(id) {
    return await pool.query("DELETE FROM tasks WHERE id = ?", [id]);
  },
};

module.exports = taskModel;
