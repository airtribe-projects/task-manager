const data = require("../task.json");

const getAll = () => {
  return data.tasks;
};

const findById = (id) => {
  const task = data.tasks.find((t) => t.id === Number(id));
  return task;
};

const createTask = (task) => {
  const { title, description, completed } = task;
  const ids = data.tasks.map((t) => t.id);
  const newId = Math.max(...ids) + 1;
  const newTask = {
    id: newId,
    title,
    description,
    completed,
  };
  data.tasks.push(newTask);

  return newTask;
};

const updateTask = (id, taskParams) => {
  const { title, description, completed } = taskParams;
  const task = findById(Number(id));
  if (task === undefined) {
    return undefined;
  }
  task.title = title;
  task.description = description;
  task.completed = completed;

  return task;
};

const removeTask = (id) => {
  const task = findById(id);
  if (task === undefined) {
    return undefined;
  }
  data.tasks = data.tasks.filter((t) => t.id !== Number(id));
  return true;
};

module.exports = { getAll, findById, updateTask, createTask, removeTask };
