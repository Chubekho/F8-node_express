const express = require("express");
const router = express.Router();
const { readdirSync } = require("fs");

const postfix = ".route.js";

readdirSync(__dirname)
  .filter((route) => route.endsWith(postfix))
  .forEach((fileName) => {
    const resource = fileName.replace(postfix, "")
    router.use(`/${resource}s`, require(`./${fileName}`));
  });

module.exports = router;
