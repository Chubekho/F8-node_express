const { loadDB, saveDB } = require("../utils/jsonDB");

const getNextId = (comments) => {
  if (comments.length === 0) return 1;
  const ids = comments.map((p) => p.id);
  return Math.max(...ids) + 1;
};

const commentModel = {
  async findAll() {
    const db = await loadDB("comment");
    return db;
  },

  async findOne(id) {
    const db = await loadDB("comment");
    return db.find((_comment) => _comment.id === id);
  },

  async updateOne(data) {
    const db = await loadDB("comment");
    const newComment = {
      id: getNextId(db),
      ...data,
      createAt: new Date().toISOString(),
    };

    db.push(newComment);
    await saveDB("comment", db);
    return newComment;
  },

  async updateOne(id, data) {
    const db = await loadDB("comment");
    const index = db.findIndex((comment) => comment.id === id);

    if (index === -1) return null;

    const updatedComment = {
      ...db[index],
      ...data
    };
    db[index] = updatedComment;

    await saveDB("comment", db);
    return updatedComment;
  },

  async deleteOne(id) {
    const db = await loadDB("comment");
    const index = db.findIndex((comment) => comment.id === id);

    if (index === -1) return null;

    const deletedComment = db.splice(index, 1);
    await saveDB("comment", db);
    return deletedComment;
  },
};

module.exports = commentModel;
