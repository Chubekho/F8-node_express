const express = require("express");
const router = express.Router();

// [GET] /api/posts/
router.get("/", (req, res) => {
  res.send("post list");
});

// [GET] /api/posts/:id
router.get("/:id", (req, res) => {
  res.send("post details");
});

// [POST] /api/posts/
router.post("/", (req, res) => {
  res.send("post created");
});

module.exports = router;
