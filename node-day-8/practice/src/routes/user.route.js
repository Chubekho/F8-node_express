const express = require("express");
const router = express.Router();

const userController = require("../controllers/user.controller");

// GET: api/user/
router.get("/get-all", userController.getAllUsers);

module.exports = router;
