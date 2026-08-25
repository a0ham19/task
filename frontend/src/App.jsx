import Header from "./components/Header";
import Todoform from "./components/Todoform";
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
            todo.id === updatedTodo.id ? updatedTodo : todo,
          ),
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
    <>
      <Header />
      <Todoform />
    </>
  );
}

export default App;
