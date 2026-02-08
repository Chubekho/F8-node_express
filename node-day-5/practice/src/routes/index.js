const express = require("express");
const router = express.Router();

const authRoutes = require("./auth.route");
const userRoutes = require("./user.route");
const conversationRoutes = require("./conversation.route");

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/conversations", conversationRoutes);

module.exports = router;
