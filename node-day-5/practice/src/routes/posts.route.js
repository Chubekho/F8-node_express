const express = require("express");
const router = express.Router();
const postsController = require("../controllers/posts.controller");
const postCreateValidator = require("../middlewares/postCreateValidator.middleware");

// [GET] /api/posts/
router.get("/", postsController.getAll);
// [GET] /api/posts/:id
router.get("/:id", postsController.getOne);
// [POST] /api/posts/
router.post("/", postCreateValidator, postsController.createOne);

module.exports = router;
