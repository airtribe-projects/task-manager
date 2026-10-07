const taskService = require('../services/taskService.js');

function getTasks(req, res) {
    const tasks = taskService.getTasks();
    res.json(tasks);
}

function getTaskById(req, res) {
    const taskId = req.params.id;
    const task = taskService.getTaskById(taskId);
    if (!task) {
        return res.status(404).json({ error: 'Task not found' });
    }

    res.json(task);
}

function createTask(req, res) {
    const { title, description, completed } = req.body;

    if (typeof title !== 'string' ||
        typeof description !== 'string' ||
        title.trim() === '' ||
        description.trim() === '') {
        return res.status(400).json({ error: 'Title and description are required and must be non-empty strings' });
    }

    if (typeof completed !== 'boolean') {
        return res.status(400).json({ error: 'Completed must be a boolean' });
    }

    const newTask = taskService.createTask( title.trim() , description.trim(), completed );

    res.status(201).json(newTask);
}

function updateTask(req, res) {
    const taskId = req.params.id;
    const { title, description, completed } = req.body;

    if (typeof title !== 'string' ||
        typeof description !== 'string' ||
        title.trim() === '' ||
        description.trim() === '') {
        return res.status(400).json({ error: 'Title and description are required and must be non-empty strings' });
    }

    if (typeof completed !== 'boolean') {
        return res.status(400).json({ error: 'Completed must be a boolean' });
    }

    const updatedTask = taskService.updateTask( taskId, title.trim(), description.trim(), completed );

    if (!updatedTask) {
        return res.status(404).json({ error: 'Task not found' });
    }

    res.json(updatedTask);
}

function deleteTask(req, res) {
    const taskId = req.params.id;
    const isDeleted = taskService.deleteTask(taskId);

    if (!isDeleted) {
        return res.status(404).json({ error: 'Task not found' });
    }

    res.status(200).send();
}

module.exports = { getTasks, getTaskById, createTask, updateTask, deleteTask };