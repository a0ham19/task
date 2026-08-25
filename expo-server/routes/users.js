const express = require('express');

const router = express.Router();

let nextId = 3;
const users = [
    { id: 1, name: 'Alex Morgan', email: 'alex@example.com' },
    { id: 2, name: 'Sam Lee', email: 'sam@example.com' },
];

router.get('/', (req, res) => {
    res.json(users);
});

router.get('/:id', (req, res) => {
    const user = users.find((item) => item.id === Number(req.params.id));

    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
});

router.post('/', (req, res) => {
    const name = typeof req.body.name === 'string' ? req.body.name.trim() : '';
    const email = typeof req.body.email === 'string' ? req.body.email.trim() : '';

    if (!name || !email) {
        return res.status(400).json({ message: 'Name and email are required' });
    }

    const user = { id: nextId++, name, email };
    users.push(user);
    res.status(201).json(user);
});

module.exports = router;
