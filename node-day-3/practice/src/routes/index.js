const express = require("express");
const router = express.Router();

const postsRoute = require("./posts.route");
const commentsRoute = require("./comments.route");

router.use("/posts", postsRoute)
router.use("/comments", commentsRoute)

module.exports = router;
