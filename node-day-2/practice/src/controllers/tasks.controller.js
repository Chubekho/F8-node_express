const tasksModel = require("../models/tasks.model");

const getAll = (req, res) => {
  const taskList = tasksModel.findAll();
  res.send({ data: taskList });
};

const getOne = (req, res) => {
  const task = tasksModel.findOne(+req.params.id);
  res.send({ data: task });
};

const create = (req, res) => {
  const newTask = tasksModel.create({
    title: req.body.title ? req.body.title : "",
    isCompleted: req.body.isCompleted ? req.body.isCompleted : "false",
  });
  res.send({
    data: newTask,
  });
};

const toggle = (req, res) => {
  res.send("Toggle task completed");
};

module.exports = { getAll, getOne, create, toggle };
