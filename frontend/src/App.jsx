import { useEffect, useState } from "react";

function App() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");

  // GET ALL TODOS
  useEffect(() => {
    fetch("http://localhost:3000/todos")
      .then((response) => response.json())
      .then((data) => {
        setTodos(data);
      });
  }, []);

  // CREATE TODO
  const createTodo = () => {
    if (!title.trim()) return;

    fetch("http://localhost:3000/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
      }),
    })
      .then((response) => response.json())
      .then((newTodo) => {
        setTodos([...todos, newTodo]);
        setTitle("");
      });
  };

  // UPDATE TODO
  const toggleTodo = (todo) => {
    fetch(`http://localhost:3000/todos/${todo.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: todo.title,
        is_completed: !todo.is_completed,
      }),
    })
      .then((response) => response.json())
      .then((updatedTodo) => {
        setTodos(
          todos.map((todo) =>
            todo.id === updatedTodo.id ? updatedTodo : todo
          )
        );
      });
  };

  // DELETE TODO
  const deleteTodo = (id) => {
    fetch(`http://localhost:3000/todos/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then(() => {
        setTodos(todos.filter((todo) => todo.id !== id));
      });
  };

  return (
    <div>
      <h1>My Todo App</h1>

      <input
        type="text"
        placeholder="Enter a todo"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
      />

      <button onClick={createTodo}>Add</button>

      {todos.map((todo) => (
        <div key={todo.id}>
          <h3>{todo.title}</h3>

          <p>
            {todo.is_completed ? "Completed" : "Not completed"}
          </p>

          <button onClick={() => toggleTodo(todo)}>
            {todo.is_completed ? "Undo" : "Complete"}
          </button>

          <button onClick={() => deleteTodo(todo.id)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default App;