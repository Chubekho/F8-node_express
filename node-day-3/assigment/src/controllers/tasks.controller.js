const taskModel = require("../models/task.model");

const taskControllers = {
  async getAll(req, res) {
    const tasks = await taskModel.findAll();
    res.success(tasks);
  },

  async getOne(req, res) {
    const task = await taskModel.findOne(+req.params.id);
    if (!task) {
      return res.error(404, { message: "Task not found!" });
    }
    res.success(task);
  },

  async createOne(req, res) {
    const newTask = {
      title: req.body.title,
      completed: req.body.completed,
    };
    const [result] = await taskModel.create(newTask);
    res.success({ id: result.insertId, ...newTask }, 201);
  },

  async editOne(req, res) {
    const taskId = +req.params.id;
    const editTask = await taskModel.findOne(taskId);
    if (!editTask) {
      return res.error(404, { message: "Task not found!" });
    }
    
    const editData = {
      title: req.body.title,
      completed: req.body.completed,
    };

    const [result] = await taskModel.update(taskId, editData);
    res.success({ affectedRows: result.affectedRows });
  },

  async deleteOne(req, res) {
    const taskId = +req.params.id;
    const deleteTask = await taskModel.findOne(taskId);
    if (!deleteTask) {
      return res.error(404, { message: "Task not found!" });
    }

    const [result] = await taskModel.destroy(taskId);
    res.success({ affectedRows: result.affectedRows });
  },
};

module.exports = taskControllers;
