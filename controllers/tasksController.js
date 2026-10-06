const { tasks } = require('../models/tasksModel');

const validateTask = (task) => {
    if (typeof task.title !== "string" || task.title.trim() === "") {
        const error = new Error("Title cannot be empty");
        error.statusCode = 400;
        throw error;
    }

    if (
        typeof task.description !== "string" ||
        task.description.trim() === ""
    ) {
        const error = new Error("Description cannot be empty");
        error.statusCode = 400;
        throw error;
    }

    if (typeof task.completed !== "boolean") {
        const error = new Error("Completed can only be true or false");
        error.statusCode = 400;
        throw error;
    }
};

const getAllTasks = (filters) => {
    let filteredTasks = tasks;

    if (filters.completed !== undefined) {
        const completed = filters.completed === "true";

        filteredTasks = filteredTasks.filter(
            task => task.completed == completed
        );
    }
    return filteredTasks;
};

const getTaskById = (taskId) => {
    const task = tasks.find(
        task => task.id === Number(taskId)
    );

    if (!task) {
        const error = new Error("Task Not Found");
        error.statusCode = 404;
        throw error;
    }

    return task;
};

const createTask = (task) => {
    task.id = task.id ? task.id : tasks.length;
    validateTask(task);
    tasks.push(task);

    return task;
};

const deleteTask = (taskId) => {
    const index = tasks.findIndex(
        task => task.id === Number(taskId)
    );

    if (index === -1) {
        const error = new Error("Task Not Found");
        error.statusCode = 404;
        throw error;
    }

    return tasks.splice(index, 1)[0];
};

const updateTask = (taskId, body) => {
    const task = tasks.find(
        task => task.id === Number(taskId)
    );

    if (!task) {
        const error = new Error("Task Not Found");
        error.statusCode = 404;
        throw error;
    }

    validateTask(body);

    task.title = body.title;
    task.description = body.description;
    task.completed = body.completed;

    return task;
};

module.exports = {
    getAllTasks,
    getTaskById,
    createTask,
    deleteTask,
    updateTask
};
