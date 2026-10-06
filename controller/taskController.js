const { tasks } = require("../models/taskModel");

const getAllTasks = () => {
  return tasks;
};

const getTaskById = (taskId) => {
  //   const task = tasks[taskId];

  const task = tasks.find((task) => task.id === Number(taskId));
  if (!task) {
    throw new Error("Task Not Found");
  }

  return task;
};

const createTask = (task) => {
  task.id = tasks.length + 1;
  tasks.push(task);
  return task;
};

const editTask = (taskId, task) => {
  const updatedTask = tasks.find((task) => task.id === taskId);
  if (!updatedTask) {
    throw new Error("Task Not Found");
  }

  updatedTask.title = task.title;
  updatedTask.description = task.description;
  updatedTask.completed = task.completed;

  return updatedTask;
};

const deleteTask = (taskId) => {
  const taskIndex = tasks.findIndex((task) => task.id === taskId);

  if (taskIndex === -1) {
    throw new Error("Task not Found");
  }

  const deletedTask = tasks.splice(taskIndex, 1);

  return deletedTask[0];
};

module.exports = { getAllTasks, getTaskById, createTask, editTask, deleteTask };
