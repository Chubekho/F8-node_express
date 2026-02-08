const { readDB, writeDB } = require("../utils/jsonDB");

let db = {};

readDB().then((result) => {
  db = JSON.parse(result);
});

const tasksModel = {
  findAll() {
    return db.tasks;
  },
  findOne(id) {
    return db.tasks.find((task) => task.id === id);
  },
  create(task) {
    const newTask = {
      id: ++db.maxId,
      ...task,
    };
    db.tasks.push(newTask);
    writeDB(db);
    return task;
  },
};

module.exports = tasksModel;
