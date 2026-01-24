const express = require("express");
const router = express.Router();

const postsRoute = require("./posts.route");

router.use("/posts", postsRoute)

module.exports = router;
