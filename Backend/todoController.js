const Todo = require("./Todo");

const normalizeTodoState = (body) => {
    if (body.completed !== undefined) {
        return Boolean(body.completed);
    }

    if (body.is_completed !== undefined) {
        return Boolean(body.is_completed);
    }

    return undefined;
};

const getAllTodos = async (req, res) => {
    try {
        const todos = await Todo.findAll({ order: [["id", "DESC"]] });
        res.json(todos);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch todos", error: error.message });
    }
};

const getTodoById = async (req, res) => {
    try {
        const todo = await Todo.findByPk(req.params.id);

        if (!todo) {
            return res.status(404).json({ message: "Todo not found" });
        }

        res.json(todo);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch todo", error: error.message });
    }
};

const createTodo = async (req, res) => {
    const { title } = req.body;

    if (!title || !title.trim()) {
        return res.status(400).json({ message: "Title is required" });
    }

    try {
        const todo = await Todo.create({
            title: title.trim(),
            is_completed: normalizeTodoState(req.body),
        });

        res.status(201).json(todo);
    } catch (error) {
        res.status(500).json({ message: "Failed to create todo", error: error.message });
    }
};

const updateTodo = async (req, res) => {
    try {
        const todo = await Todo.findByPk(req.params.id);

        if (!todo) {
            return res.status(404).json({ message: "Todo not found" });
        }

        if (req.body.title !== undefined) {
            todo.title = req.body.title.trim();
        }

        const nextCompletedState = normalizeTodoState(req.body);
        if (nextCompletedState !== undefined) {
            todo.is_completed = nextCompletedState;
        }

        await todo.save();
        res.json(todo);
    } catch (error) {
        res.status(500).json({ message: "Failed to update todo", error: error.message });
    }
};

const deleteTodo = async (req, res) => {
    try {
        const todo = await Todo.findByPk(req.params.id);

        if (!todo) {
            return res.status(404).json({ message: "Todo not found" });
        }

        await todo.destroy();
        res.json({ message: "Todo deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete todo", error: error.message });
    }
};

module.exports = {
    getAllTodos,
    getTodoById,
    createTodo,
    updateTodo,
    deleteTodo,
};
