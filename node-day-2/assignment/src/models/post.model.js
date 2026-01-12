const { loadDB, saveDB } = require("../utils/jsonDB");

const getNextId = (posts) => {
  if (posts.length === 0) return 1;
  const ids = posts.map((p) => p.id);
  return Math.max(...ids) + 1;
};

const postModel = {
  async findAll() {
    const db = await loadDB("post");
    return db;
  },

  async findOne(id) {
    const db = await loadDB("post");
    return db.find((post) => post.id === id);
  },

  async create(data) {
    const db = await loadDB("post");
    const newPost = {
      id: getNextId(db),
      title: data.title,
      content: data.content,
      createdAt: new Date().toISOString(),
    };

    db.push(newPost);
    await saveDB("post", db);
    return newPost;
  },

  async editOne(id, data) {
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

  async delOne(id) {
    const db = await loadDB("post");
    const index = db.findIndex(post => post.id === id);
    
    if (index === -1) return null;

    const deletedPost = db[index];
    db.splice(index, 1);
    await saveDB("post", db);
    return deletedPost;
  },
};

module.exports = postModel;
