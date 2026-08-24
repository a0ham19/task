const express = require("express");
const cors = require("cors");
const { Sequelize, DataTypes } = require("sequelize");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());

const sequelize = new Sequelize("todo_app", "root", "019a0HamHAShem^^.", {
  host: "localhost",
  dialect: "mysql",
  logging: false,
});

const Todo = sequelize.define(
  "Todo",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },

    is_completed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    tableName: "todo",
    timestamps: false,
  },
);

// GET ALL TODOS
app.get("/todos", async (req, res) => {
  try {
    const todos = await Todo.findAll();
    res.json(todos);
  } catch (error) {
    res.status(500).json({ message: "Something happened" });
  }
});

// GET ONE TODO
app.get("/todos/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const todo = await Todo.findByPk(id);

    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.json(todo);
  } catch (error) {
    res.status(500).json({ message: "Something happened" });
  }
});

// CREATE TODO
app.post("/todos", async (req, res) => {
  const { title } = req.body;

  if (!title) {
    return res.status(400).json({ message: "Title is required" });
  }

  try {
    const todo = await Todo.create({ title });
    res.status(201).json(todo);
  } catch (error) {
    res.status(500).json({ message: "Something happened" });
  }
});

// UPDATE TODO
app.put("/todos/:id", async (req, res) => {
  const { id } = req.params;
  const { title, is_completed } = req.body;

  try {
    const todo = await Todo.findByPk(id);

    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    await todo.update({
      title,
      is_completed,
    });

    res.json(todo);
  } catch (error) {
    res.status(500).json({ message: "Something happened" });
  }
});

// DELETE TODO
app.delete("/todos/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const todo = await Todo.findByPk(id);

    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    await todo.destroy();

    res.json({ message: "Todo deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Something happened" });
  }
});

async function start() {
  await sequelize.authenticate();
  await sequelize.sync();

  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}

start().catch((err) => {
  console.error("Failed to start server:", err);
  process.exit(1);
});
