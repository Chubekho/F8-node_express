// const commentModel  = require('...')

const getAll = (req, res) => {
  res.send("comment list");
};

const getOne = (req, res) => {
  res.send("comment detail");
};

const createOne = (req, res) => {
  res.send("comment created");
};

const editOne = (req, res) => {
  res.send("comment edited");
};

const delOne = (req, res) => {
  res.send("comment deleted");
};

module.exports = { getAll, getOne, createOne, editOne, delOne };
