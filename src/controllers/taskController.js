const taskService = require("../services/taskService");

function getAllTasks(req, res) {
  const { completed, sortBy } = req.query;
  const tasks = taskService.getAllTasks({ completed, sortBy });
  res.status(200).json(tasks);
}

function getTaskById(req, res) {
  const taskId = parseInt(req.params.id, 10);
  const task = taskService.getTaskById(taskId);

  if (!task) {
    return res.status(404).json({ error: "Task not found" });
  }

  return res.status(200).json(task);
}

function createTask(req, res) {
  const { title, description, completed } = req.body;

  if (!title || typeof title !== "string" || title.trim() === "") {
    return res
      .status(400)
      .json({ error: "Title is required and must be a non-empty string" });
  }

  if (
    description === undefined ||
    typeof description !== "string" ||
    description.trim() === ""
  ) {
    return res
      .status(400)
      .json({ error: "Description is required and must be a non-empty string" });
  }

  const newTask = taskService.createTask({ title, description, completed });
  return res.status(201).json(newTask);
}

function updateTask(req, res) {
  const taskId = parseInt(req.params.id, 10);
  const { title, description, completed } = req.body;

  if (
    title !== undefined &&
    (typeof title !== "string" || title.trim() === "")
  ) {
    return res.status(400).json({ error: "Title must be a non-empty string" });
  }

  if (description !== undefined && typeof description !== "string") {
    return res.status(400).json({ error: "Description must be a string" });
  }

  if (completed !== undefined && typeof completed !== "boolean") {
    return res.status(400).json({ error: "Completed must be a boolean" });
  }

  const updatedTask = taskService.updateTask(taskId, { title, description, completed });
  if (!updatedTask) {
    return res.status(404).json({ error: "Task not found" });
  }

  return res.status(200).json(updatedTask);
}

function deleteTask(req, res) {
  const taskId = parseInt(req.params.id, 10);
  const deleted = taskService.deleteTask(taskId);

  if (!deleted) {
    return res.status(404).json({ error: "Task not found" });
  }

  return res.status(200).json({ message: "Task deleted successfully" });
}

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
};
