const express = require("express");
const router = express.Router();

// GET /api/conversations
router.get("/", () => {});
// POST /api/conversations
router.post("/", () => {});
// POST /api/conversations/:id/participants
router.post("/:id/participant", () => {});
// GET /api/conversations/:id/messages
router.get("/:id/messages", () => {});
// POST /api/conversations/:id/messages
router.post("/:id/messages", () => {});

module.exports = router;
