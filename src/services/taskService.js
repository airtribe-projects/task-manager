const { loadTasks } = require("../data/taskData");

let tasks = loadTasks();
let currentId = tasks.reduce((max, task) => Math.max(max, Number(task.id) || 0), 0) + 1;

function getAllTasks({ completed, sortBy } = {}) {
  let result = [...tasks];

  if (completed !== undefined) {
    const isCompleted = completed === "true";
    result = result.filter((task) => task.completed === isCompleted);
  }

  if (sortBy === "createdAt") {
    result.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
  }

  return result;
}

function getTaskById(id) {
  return tasks.find((task) => task.id === id);
}

function createTask(taskInput) {
  const { title, description, completed } = taskInput;

  const newTask = {
    id: currentId++,
    title: title.trim(),
    description: description.trim(),
    completed: typeof completed === "boolean" ? completed : false,
    createdAt: new Date().toISOString(),
  };

  tasks.push(newTask);
  return newTask;
}

function updateTask(id, updates) {
  const taskIndex = tasks.findIndex((task) => task.id === id);
  if (taskIndex === -1) return null;

  const existingTask = tasks[taskIndex];
  const updatedTask = {
    ...existingTask,
    title: updates.title !== undefined ? updates.title.trim() : existingTask.title,
    description:
      updates.description !== undefined
        ? updates.description
        : existingTask.description,
    completed:
      updates.completed !== undefined ? updates.completed : existingTask.completed,
  };

  tasks[taskIndex] = updatedTask;
  return updatedTask;
}

function deleteTask(id) {
  const taskIndex = tasks.findIndex((task) => task.id === id);
  if (taskIndex === -1) return false;

  tasks.splice(taskIndex, 1);
  return true;
}

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
};
