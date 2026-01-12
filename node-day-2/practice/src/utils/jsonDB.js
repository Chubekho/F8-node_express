const { readFile, writeFile } = require("fs/promises");

const DB_FILE = "./db.json";

const readDB = async () => {
  try {
    const data = await readFile(DB_FILE, { encoding: "utf-8" });
    return data;
  } catch (err) {
    if (err.code === "ENOENT") {
      await writeDB({});
    }
    return {};
  }
};

const writeDB = async (data) => {
  writeFile(DB_FILE, JSON.stringify(data, null, 4));
};

module.exports = { readDB, writeDB };
