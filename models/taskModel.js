const fs = require("fs");
const path = require("path");
const filePath = path.join(__dirname, "../task.json");
const data = fs.readFileSync(filePath, "utf8");

const tasks = JSON.parse(data).tasks;
let nextId = tasks?.length + 1;

// ==========================================================================================================================================

const getAllTasks = () => {
    return tasks;
};

// Get task by ID
const getTaskById = (id) => {
    const task = tasks.find((ele) => ele.id === id);
    return task ?? undefined;
};

// ==========================================================================================================================================

const addTask = (title, description, completed = false) => {
    const task = {
        id: nextId,
        title: title,
        description: description,
        completed: completed
    };

    nextId++;
    tasks.push(task);
    return task;
};

// ==========================================================================================================================================

const deleteTaskById = (id) => {
    let index = -1;
    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].id === id) {
            index = i;
            break;
        }
    }
    if (index === -1) {
        return false;
    }
    tasks.splice(index, 1);
    return true;
};


// ==========================================================================================================================================

const updateTaskById = (id, data) => {
    const task = getTaskById(id);
    if (!task) {
        return null;
    }
    if (data.title !== undefined) {
        task.title = data.title;
    }
    if (data.description !== undefined) {
        task.description = data.description;
    }
    if (data.completed !== undefined) {
        task.completed = data.completed;
    }
    return task;
};

// ==========================================================================================================================================

module.exports = { getAllTasks, getTaskById, addTask, deleteTaskById, updateTaskById };