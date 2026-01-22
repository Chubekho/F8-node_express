const express = require('express')
const router = express.Router();

const taskRoutes = require("./tasks.routes")

router.use("/tasks", taskRoutes)

module.exports = router;