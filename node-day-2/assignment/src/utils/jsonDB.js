const { readFile, writeFile, mkdir } = require("fs/promises");
const path = require("node:path");

const DB_DIR = path.join(__dirname, "..", "..", "db");

const getFilePath = (resourceName) => {
  return path.join(DB_DIR, `${resourceName}.json`);
};

const loadDB = async (resourceName = "db") => {
  const DB_FILE = getFilePath(resourceName);
  try {
    const data = await readFile(DB_FILE, { encoding: "utf-8" });
    return JSON.parse(data);
  } catch (err) {
    if (err.code === "ENOENT") {
      await saveDB(resourceName, []);
      return {};
    }
    throw err;
  }
};

const saveDB = async (resourceName = "db", data) => {
  const DB_FILE = getFilePath(resourceName);
  try {
    await writeFile(DB_FILE, JSON.stringify(data, null, 4));
  } catch (err) {
    if (err.code === "ENOENT") {
      await mkdir(DB_DIR, { recursive: false });
      await writeFile(DB_FILE, JSON.stringify(data, null, 4));
    } else {
      throw err;
    }
  }
};

module.exports = { loadDB, saveDB };
