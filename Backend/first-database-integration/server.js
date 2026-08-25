const mysql = require('mysql2/promise');
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

// Middleware to parse incoming JSON payload in request bodies
app.use(express.json());
app.use(cors());

let connection;

// ------------------------------------------------------------------
// 1. READ ALL (GET) - Retrieve all users
// ------------------------------------------------------------------
app.get('/', (req, res) => {
  res.send('Welcome to the Express App!');
});


app.get('/users', async (req, res) => {
  try {
    const [results] = await connection.query(
      'SELECT * FROM users'
    );
    res.json(results);
  } catch {
    return res.status(500).json({ message: 'Something happended' });
  }
});

// ------------------------------------------------------------------
// 2. READ ONE (GET) 
// ------------------------------------------------------------------
app.get('/users/:id', async (req, res) => {
  const { id } = req.params;
  console.log(id)

  try {
    const [results] = await connection.query(
      `SELECT * FROM users WHERE id = ${id}`
    );

    if (results.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(results);
  } catch {
    return res.status(500).json({ message: 'Something happended' });
  }
});


// ------------------------------------------------------------------
// 3. CREATE (POST) - Add a new user
// ------------------------------------------------------------------
app.post('/users', async (req, res) => {
  const { name, email } = req.body;

  // Basic validation
  if (!name || !email) {
    return res.status(400).json({ message: 'Name and email are required' });
  }

  try {
    const [result] = await connection.query(
      'INSERT INTO users (name, email) VALUES (?, ?)',
      [name, email]
    );

    res.status(201).json({
      id: result.insertId,
      name,
      email
    });
  } catch {
    return res.status(500).json({ message: 'Something happended' });
  }
});

async function start() {
  connection = await mysql.createConnection({
    host: '192.168.1.119',
    user: 'root',
    database: 'mydb',
    password: "123456789"
  });

  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}

start().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
