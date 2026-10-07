const taskFile = require('../task.json');

function getTasks() {
    return taskFile.tasks;
}

function getTaskById(id) {
    const taskId = parseInt(id);
    return taskFile.tasks.find(t => t.id === taskId);
}

function createTask(title, description, completed) {

    const maxId = taskFile.tasks.reduce((max, task) => Math.max(max, task.id), 0);
    const newId = maxId + 1;
    const newTask = {
        id: newId,
        title,
        description,
        completed
    };
    taskFile.tasks.push(newTask);
    return newTask;
}

function updateTask(id, title, description, completed) {
    const taskId = parseInt(id);
    const taskIndex = taskFile.tasks.findIndex(t => t.id === taskId);
    if (taskIndex === -1) {
        return null;
    }
    taskFile.tasks[taskIndex] = {
        id: taskId,
        title,
        description,
        completed
    };
    return taskFile.tasks[taskIndex];
}

function deleteTask(id) {
    const taskId = parseInt(id);
    const taskIndex = taskFile.tasks.findIndex(t => t.id === taskId);
    if (taskIndex === -1) {
        return null;
    }
    taskFile.tasks.splice(taskIndex, 1);
    return true;
}

module.exports = { getTasks, getTaskById, createTask, updateTask, deleteTask };