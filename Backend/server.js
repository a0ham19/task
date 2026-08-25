const express = require("express");
const cors = require("cors");
const { Sequelize, DataTypes } = require("sequelize");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());

// الاتصال بقاعدة البيانات
const sequelize = new Sequelize("todo__app", "root", "019a0HamHAShem^^.", {
  host: "192.168.1.175",
  dialect: "mysql",
  logging: true,
});

// تعريف الـ Model
const Todo = sequelize.define(
  "Todo__app",
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
  }
);

// 1. GET ALL TODOS
app.get("/todos", async (req, res) => {
  try {
    const todos = await Todo.findAll();
    res.json(todos);
  } catch (error) {
    res.status(500).json({ message: "Something happened", error: error.message });
  }
});

// 2. GET ONE TODO
app.get("/todos/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const todo = await Todo.findByPk(id);

    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.json(todo);
  } catch (error) {
    n
  }
});

// 3. CREATE TODO
app.post("/todos", async (req, res) => {
  const { title } = req.body;

  if (!title) {
    return res.status(400).json({ message: "Title is required" });
  }

  try {
    const todo = await Todo.create({ title });
    res.status(201).json(todo);
  } catch (error) {
    res.status(500).json({ message: "Something happened", error: error.message });
  }
});

// 4. UPDATE TODO
app.put("/todos/:id", async (req, res) => {
  const { id } = req.params;
  const { title, is_completed } = req.body;

  try {
    const todo = await Todo.findByPk(id);

    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    await todo.update({
      title: title !== undefined ? title : todo.title,
      is_completed: is_completed !== undefined ? is_completed : todo.is_completed,
    });

    res.json(todo);
  } catch (error) {
    res.status(500).json({ message: "Something happened", error: error.message });
  }
});

// 5. DELETE TODO
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
    res.status(500).json({ message: "Something happened", error: error.message });
  }
});

// CATCH-ALL UNKNOWN ROUTES (404)
app.use((req, res) => {
  res.status(404).json({ message: `Cannot ${req.method} ${req.originalUrl} - Route not found!` });
});

// START SERVER
async function start() {
  await sequelize.authenticate();
  console.log("Database connected successfully.");
  await sequelize.sync();

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}

start().catch((err) => {
  console.error("Failed to start server:", err);
  process.exit(1);
});