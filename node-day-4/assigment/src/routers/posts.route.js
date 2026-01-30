const express = require("express");
const router = express.Router();

const postController = require("../controllers/posts.controller")

router.get("/", postController.getAll);


module.exports = router;