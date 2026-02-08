const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController.controller");
const authRequired = require("../middlewares/authRequired.middleware")

// POST /api/auth/register
router.post("/register", authController.register);
// POST /api/auth/login
router.post("/login", authController.login);
// GET /api/auth/me
router.get("/me", authRequired, authController.getCurrentUser)
module.exports = router;
