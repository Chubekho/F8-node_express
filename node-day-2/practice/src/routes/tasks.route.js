const express = require("express");
const router = express.Router();
const tasksController = require("../controllers/tasks.controller");

router.get("/", tasksController.getAll);
router.get("/:id", tasksController.getOne);
router.post("/", tasksController.create);
router.post("/:id/toggle", tasksController.toggle);

module.exports = router;
