const express = require("express");
const router = express.Router();
const commentsController = require("../controllers/comments.controller");

// [GET] /api/comments/
router.get("/", commentsController.getAll);
// [GET] /api/comments/:id
router.get("/:id", commentsController.getOne);
// [POST] /api/comments/
router.post("/", commentsController.createOne);
// [PUT] /api/comments/:id
router.put("/:id", commentsController.editOne);
// [DELETE] /api/comments/:id
router.delete("/:id", commentsController.delOne);

module.exports = router;
