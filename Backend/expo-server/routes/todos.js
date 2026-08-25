const express = require('express');

const router = express.Router();

let nextId = 4;
const todos = [
    { id: 1, title: 'Connect the Expo app', is_completed: true },
    { id: 2, title: 'Build the todo list screen', is_completed: false },
    { id: 3, title: 'Test the mock API', is_completed: false },
];

router.get('/', (req, res) => {
    res.json(todos);
});

router.get('/:id', (req, res) => {
    const todo = todos.find((item) => item.id === Number(req.params.id));

    if (!todo) {
        return res.status(404).json({ message: 'Todo not found' });
    }

    res.json(todo);
});

router.post('/', (req, res) => {
    const title = typeof req.body.title === 'string' ? req.body.title.trim() : '';

    if (!title) {
        return res.status(400).json({ message: 'Title is required' });
    }

    const todo = { id: nextId++, title, is_completed: false };
    todos.push(todo);
    res.status(201).json(todo);
});

router.patch('/:id', (req, res) => {
    const todo = todos.find((item) => item.id === Number(req.params.id));

    if (!todo) {
        return res.status(404).json({ message: 'Todo not found' });
    }

    if (req.body.title !== undefined) {
        const title = typeof req.body.title === 'string' ? req.body.title.trim() : '';
        if (!title) {
            return res.status(400).json({ message: 'Title must be a non-empty string' });
        }
        todo.title = title;
    }

    if (req.body.is_completed !== undefined) {
        if (typeof req.body.is_completed !== 'boolean') {
            return res.status(400).json({ message: 'is_completed must be a boolean' });
        }
        todo.is_completed = req.body.is_completed;
    }

    res.json(todo);
});

router.delete('/:id', (req, res) => {
    const todoIndex = todos.findIndex((item) => item.id === Number(req.params.id));

    if (todoIndex === -1) {
        return res.status(404).json({ message: 'Todo not found' });
    }

    todos.splice(todoIndex, 1);
    res.status(204).send();
});

module.exports = router;
