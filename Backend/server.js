const express = require("express");
const cors = require("cors");
const { Sequelize, DataTypes } = require("sequelize");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

const sequelize = new Sequelize(
    process.env.DB_NAME || "mydb",
    process.env.DB_USER || "root",
    process.env.DB_PASSWORD || "123456789",
    {
        host: process.env.DB_HOST || "localhost",
        dialect: process.env.DB_DIALECT || "mysql",
        logging: false,
    }
);

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
        completed: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
    },
    {
        tableName: "todos",
        timestamps: false,
    }
);

app.get("/", (req, res) => {
    res.json({ message: "Todo API is running" });
});

app.get("/todos", async (req, res) => {
    try {
        const todos = await Todo.findAll();
        res.json(todos);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

app.post("/todos", async (req, res) => {
    const { title } = req.body;

    if (!title) {
        return res.status(400).json({ message: "Title is required" });
    }

    try {
        const todo = await Todo.create({ title, completed: false });
        res.status(201).json(todo);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

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
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

async function start() {
    try {
        await sequelize.authenticate();
        console.log("Connected to MySQL successfully.");
        await sequelize.sync({ alter: true });
        app.listen(PORT, "0.0.0.0", () => {
            console.log(`Server running at http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error("Failed to connect to database:", error);
        process.exit(1);
    }
}

start();
