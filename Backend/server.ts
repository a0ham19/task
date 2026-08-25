// server.ts
import express, { Request, Response } from "express";
import cors from "cors";
import { Sequelize, DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional } from "sequelize";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());

const sequelize = new Sequelize("todo_app", "root", "019a0HamHAShem^^.", {
  host: "localhost",
  dialect: "mysql",
  logging: false,
});

// Model class — defines the shape of a Todo row, with types for every column
class Todo extends Model<InferAttributes<Todo>, InferCreationAttributes<Todo>> {
  declare id: CreationOptional<number>;
  declare title: string;
  declare is_completed: CreationOptional<boolean>;
}

Todo.init(
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
    sequelize,
    tableName: "todo",
    timestamps: false,
  }
);

// GET ALL TODOS
app.get("/todos", async (req: Request, res: Response) => {
  try {
    const todos = await Todo.findAll();
    res.json(todos);
  } catch (error) {
    res.status(500).json({ message: "Something happened" });
  }
});

// GET ONE TODO
app.get("/todos/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const id = Number(req.params.id);
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
app.post("/todos", async (req: Request, res: Response) => {
  const { title } = req.body as { title?: string };

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
app.put("/todos/:id", async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const { title, is_completed } = req.body as { title?: string; is_completed?: boolean };

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
app.delete("/todos/:id", async (req: Request, res: Response) => {
  const id = Number(req.params.id);

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