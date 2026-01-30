const express = require("express");
const router = express.Router();
const usersController = require("../controllers/users.controller");

// [GET] /api/users/
router.get("/", usersController.getAll);
// [GET] /api/users/:id
router.get("/:id", usersController.getOne);
// [user] /api/users/
router.post("/", usersController.createOne);

module.exports = router;
