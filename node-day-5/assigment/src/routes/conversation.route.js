const express = require("express");
const conversationController = require("../controllers/conversation.controller");
const auth = require("../middlewares/auth.middleware");
const router = express.Router();

// GET /api/conversations
router.get("/", auth, conversationController.getAllCurrentUserConversation);

// POST /api/conversations
router.post("/", auth, conversationController.createConversation);

// POST /api/conversations/:id/participants
router.post("/:id/participants", () => {});

// GET /api/conversations/:id/messages
router.get("/:id/messages", () => {});

// POST /api/conversations/:id/messages
router.post("/:id/messages", () => {});

module.exports = router;
