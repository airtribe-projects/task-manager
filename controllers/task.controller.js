const {
  getAll,
  findById,
  updateTask,
  createTask,
  removeTask,
} = require("../repositories/task.repository");

const getAllTasksController = (req, res) => {
  const tasks = getAll();
  res.json(tasks);
};

const getTaskByIdController = (req, res) => {
  const id = req.params.id;
  const task = findById(id);
  if (task === undefined) {
    return res.status(404).json({ message: "Task not found" });
  }
  return res.json(task);
};

const createTaskController = (req, res) => {
  const { title, description, completed } = req.body;
  const newTask = createTask({ title, description, completed });
  res.status(201).json(newTask);
};

const updateTaskController = (req, res) => {
  const id = req.params.id;
  const { title, description, completed } = req.body;
  const updatedTask = updateTask(id, { title, description, completed });
  if (updatedTask === undefined) {
    return res.status(404).json({ message: "Task is not found" });
  }
  res.json(updatedTask);
};

const deleteTaskController = (req, res) => {
  const id = req.params.id;
  const task = removeTask(id);
  if (task === undefined) {
    return res.status(404).json({ message: "Task is not found" });
  }

  res.json({ message: "Task deleted successfully" });
};

module.exports = {
  getAllTasksController,
  updateTaskController,
  deleteTaskController,
  getTaskByIdController,
  createTaskController,
};
