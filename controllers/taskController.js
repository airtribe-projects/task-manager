const taskModel = require("../../Task-Manager-Project/models/taskModel");

const getAllTasks = (req, res) => {
    const tasks = taskModel.getAllTasks();
    res.status(200).json(tasks);
};


// ====================================================================================================================================

const getTaskById = (req, res) => {
    const id = Number(req.params.id);
    const task = taskModel.getTaskById(id);

    if (!task) {
        return res.status(404).json({
            message: "Task not found"
        });
    }

    res.status(200).json(task);
};

// ====================================================================================================================================

const addTask = (req, res) => {
    const title = req.body.title;
    const description = req.body.description;
    const completed = req.body.completed;
    if (!title || !description) {
        return res.status(400).json({
            message: "Title and description are required"
        });
    }

    if (typeof title !== "string" || typeof description !== "string") {
        return res.status(400).json({
            message: "Title and description must be strings"
        });
    }

    if (completed !== undefined && typeof completed !== "boolean") {
        return res.status(400).json({
            message: "Completed must be true or false"
        });
    }

    const task = taskModel.addTask(
        title.trim(),
        description.trim(),
        completed ?? false
    );

    res.status(201).json(task);
};

// ====================================================================================================================================


const deleteTaskById = (req, res) => {
    const id = Number(req.params.id);
    const deleted = taskModel.deleteTaskById(id);
    if (!deleted) {
        return res.status(404).json({
            message: "Task not found"
        });
    }
    res.status(200).json({
        message: "Task deleted successfully"
    });
};

// ====================================================================================================================================

const updateTaskById = (req, res) => {
    const id = Number(req.params.id);
    const title = req.body.title;
    const description = req.body.description;
    const completed = req.body.completed;

    if (title !== undefined && (typeof title !== "string" || title.trim() === "")) {
        return res.status(400).json({
            message: "Title should be string"
        });
    }
    if (description !== undefined && (typeof description !== "string" || description.trim() === "")) {
        return res.status(400).json({
            message: "Description should be a not empty string"
        });
    }

    if (completed !== undefined && typeof completed !== "boolean") {
        return res.status(400).json({
            message: "Completed should be true or false"
        });
    }

    const updatedTask = taskModel.updateTaskById(id, {
        title: title === undefined ? undefined : title.trim(),
        description: description === undefined ? undefined : description.trim(),
        completed: completed
    });

    if (!updatedTask) {
        return res.status(404).json({
            message: "Task not found"
        });
    }

    res.status(200).json(updatedTask);
};


// ====================================================================================================================================

module.exports = {
    getAllTasks,
    getTaskById,
    addTask,
    deleteTaskById,
    updateTaskById
};