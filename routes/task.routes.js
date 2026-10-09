const express = require("express");
const { validateTask } = require("../middlewares/validateTask.js");
const {
  getAllTasksController,
  updateTaskController,
  deleteTaskController,
  getTaskByIdController,
  createTaskController,
} = require("../controllers/task.controller.js");

const router = express.Router();

router.get("/", getAllTasksController);
router.get("/:id", getTaskByIdController);
router.post("/", validateTask, createTaskController);
router.delete("/:id", deleteTaskController);
router.put("/:id", validateTask, updateTaskController);

module.exports = { router };
