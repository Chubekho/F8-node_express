const crypto = require("crypto");

const generateString = (length = 32) => {
  return crypto.randomBytes(length).toString("hex");
};

module.exports = generateString;
