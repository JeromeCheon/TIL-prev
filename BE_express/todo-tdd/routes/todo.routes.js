const express = require('express');
const todoController = require('../controllers/todo.controller');
const router = express.Router();

router.post('/', todoController.createTodo);
router.get('/', todoController.getTodo);
router.get('/:todoId', todoController.getTodoById);
router.put('/:todoId', todoController.updateTodo);
module.exports = router;
