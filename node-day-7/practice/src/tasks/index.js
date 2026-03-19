const fs = require("fs");

const basePath = "./src/tasks";
const postfix = "Task.js";

const entries = fs
  .readdirSync("./src/tasks")
  .filter((fileName) => fileName.endsWith(postfix));

const tasksMap = entries.reduce((obj, fileName) => {
  return {
    ...obj,
    [fileName.replace(postfix, "")]: require(`./${fileName}`),
  };
}, {});

module.exports = tasksMap;
