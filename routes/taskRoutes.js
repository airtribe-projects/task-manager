const express = require('express');
const router = express.Router();

const {getAllTasks, getTaskById, createTask, deleteTask, updateTask} = require('../controllers/tasksController');

router.get('/', (req, res) => {
    const tasks = getAllTasks(req.query);
    res.json(tasks);
})

router.post('/',   (req, res) => {
    const body = req.body;
    const task = createTask(body);
    res.status(201).json(task);
})

router.get('/:taskId', (req, res) => {
    const taskId = parseInt(req.params.taskId);
    const task = getTaskById(taskId);
    res.json(task);
})

router.put('/:taskId', (req, res) => {
    const taskId = parseInt(req.params.taskId);
    const body = req.body;
    const task = updateTask(taskId, body);
    res.json(task);
})


router.delete('/:taskId', (req, res) => {
    const taskId = parseInt(req.params.taskId);
   const task = deleteTask(taskId);
    res.json(task);
})

module.exports = router;