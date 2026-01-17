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
// [PUT] /api/posts/:id
router.put("/:id", postsController.editOne);
// [DELETE] /api/posts/:id
router.delete("/:id", postsController.deleteOne);

module.exports = router;
