const express = require("express");
const router = express.Router();

const authRoutes = require("./auth.route");
const conversationRoutes = require("./conversation.route");
const userRoutes = require("./user.route")

// /api/auth
router.use("/auth", authRoutes);
// /api/conversations
router.use("/conversations", conversationRoutes);
// /api/users
router.use("/users", userRoutes);

module.exports = router;
