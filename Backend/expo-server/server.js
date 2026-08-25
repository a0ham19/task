const express = require('express');
const cors = require('cors');
const todosRouter = require('./routes/todos');
const usersRouter = require('./routes/users');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
    res.json({ status: 'ok', service: 'expo-mock-server' });
});

const supportPutUpdates = (req, res, next) => {
    if (req.method === 'PUT') {
        req.method = 'PATCH';
    }
    next();
};

// Keep the short paths used by the Expo frontend and the API-prefixed paths available.
app.use('/todos', supportPutUpdates, todosRouter);
app.use('/users', usersRouter);
app.use('/api/todos', supportPutUpdates, todosRouter);
app.use('/api/users', usersRouter);

app.use((req, res) => {
    res.status(404).json({ message: 'Route not found' });
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Expo mock server running at http://localhost:${PORT}`);
});
