const express = require('express');
const cors = require('cors');
const { Sequelize, DataTypes } = require('sequelize');
const defineUser = require('./models/users');

const app = express();
const PORT = 3002;

app.use(express.json());
app.use(cors());

const sequelize = new Sequelize('mydb', 'root', '123456789', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false
});

const User = defineUser(sequelize, DataTypes);

// ------------------------------------------------------------------
// 1. READ ALL (GET) - Retrieve all users
// ------------------------------------------------------------------
app.get('/', (req, res) => {
  res.send('Welcome to the Express App (ORM + migrations/seeds)!');
});

app.get('/users', async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch {
    return res.status(500).json({ message: 'Something happended' });
  }
});

// ------------------------------------------------------------------
// 2. READ ONE (GET) - Find a user by id
// ------------------------------------------------------------------
app.get('/users/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch {
    return res.status(500).json({ message: 'Something happended' });
  }
});

// ------------------------------------------------------------------
// 3. CREATE (POST) - Add a new user
// ------------------------------------------------------------------
app.post('/users', async (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ message: 'Name and email are required' });
  }

  try {
    const user = await User.create({ name, email });
    res.status(201).json(user);
  } catch {
    return res.status(500).json({ message: 'Something happended' });
  }
});

async function start() {
  await sequelize.authenticate();

  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}

start().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
