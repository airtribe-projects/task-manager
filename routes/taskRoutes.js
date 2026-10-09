const express = require('express');
const taskController = require('../controllers/taskController');
const router = express.Router();

router.get('/', taskController.getAllTasks);
router.get('/:id', taskController.getTaskById);
router.post('/', taskController.addTask);
router.delete('/:id', taskController.deleteTaskById);
router.put('/:id', taskController.updateTaskById);

module.exports = router;