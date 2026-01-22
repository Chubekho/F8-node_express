const express = require("express");
const router = express.Router();

const taskControllers = require("../controllers/tasks.controller");

// [GET] /api/tasks/
router.get("/", taskControllers.getAll);
router.get("/:id", taskControllers.getOne);
router.post("/", taskControllers.createOne);
router.put("/:id", taskControllers.editOne);
router.delete("/:id", taskControllers.deleteOne);

module.exports = router;
