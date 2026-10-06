const express = require("express");
const router = express.Router();

const {
  getAllTasks,
  getTaskById,
  createTask,
  editTask,
  deleteTask,
} = require("../controller/taskController");

router.get("/", (req, res) => {
  const tasks = getAllTasks();
  res.json(tasks);
});

router.get("/:taskId", (req, res) => {
  try {
    const taskId = parseInt(req.params.taskId);
    const task = getTaskById(taskId);
    res.status(200).json(task);
  } catch (error) {
    return res.status(404).json({
      message: error.message,
    });
  }
});

router.post("/", (req, res) => {
  const body = req.body;

  if (
    typeof body.title !== "string" ||
    typeof body.description !== "string" ||
    typeof body.completed !== "boolean"
  ) {
    return res.status(400).json({
      message: "Invalid task data",
    });
  }

  const task = createTask(body);
  return res.status(201).json(task);
});

router.put("/:taskId", (req, res) => {
  try {
    const taskId = parseInt(req.params.taskId);
    const body = req.body;

    if (
      typeof body.title !== "string" ||
      typeof body.description !== "string" ||
      typeof body.completed !== "boolean"
    ) {
      return res.status(400).json({
        message: "Invalid task data",
      });
    }

    const task = editTask(taskId, body);

    return res.status(200).json(task);
  } catch (error) {
    return res.status(404).json({
      message: error.message,
    });
  }
});

router.delete("/:taskId", (req, res) => {
  try {
    const taskId = parseInt(req.params.taskId);
    const task = deleteTask(taskId);
    return res.status(200).json(task);
  } catch (error) {
    return res.status(404).json({
      message: error.message,
    });
  }
});

module.exports = router;
