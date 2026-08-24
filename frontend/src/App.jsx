// import { useEffect, useState } from "react";

// function App() {
//   const [todos, setTodos] = useState([]);
//   const [title, setTitle] = useState("");

//   // GET ALL TODOS
//   useEffect(() => {
//     fetch("http://localhost:3000/todos")
//       .then((response) => response.json())
//       .then((data) => {
//         setTodos(data);
//       });
//   }, []);

//   // CREATE TODO
//   const createTodo = () => {
//     if (!title.trim()) return;

//     fetch("http://localhost:3000/todos", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         title: title,
//       }),
//     })
//       .then((response) => response.json())
//       .then((newTodo) => {
//         setTodos([...todos, newTodo]);
//         setTitle("");
//       });
//   };

//   // UPDATE TODO
//   const toggleTodo = (todo) => {
//     fetch(`http://localhost:3000/todos/${todo.id}`, {
//       method: "PUT",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         title: todo.title,
//         is_completed: !todo.is_completed,
//       }),
//     })
//       .then((response) => response.json())
//       .then((updatedTodo) => {
//         setTodos(
//           todos.map((todo) =>
//             todo.id === updatedTodo.id ? updatedTodo : todo
//           )
//         );
//       });
//   };

//   // DELETE TODO
//   const deleteTodo = (id) => {
//     fetch(`http://localhost:3000/todos/${id}`, {
//       method: "DELETE",
//     })
//       .then((response) => response.json())
//       .then(() => {
//         setTodos(todos.filter((todo) => todo.id !== id));
//       });
//   };

//   return (
//     <div>
//       <h1>My Todo App</h1>

//       <input
//         type="text"
//         placeholder="Enter a todo"
//         value={title}
//         onChange={(event) => setTitle(event.target.value)}
//       />

//       <button onClick={createTodo}>Add</button>

//       {todos.map((todo) => (
//         <div key={todo.id}>
//           <h3>{todo.title}</h3>

//           <p>
//             {todo.is_completed ? "Completed" : "Not completed"}
//           </p>

//           <button onClick={() => toggleTodo(todo)}>
//             {todo.is_completed ? "Undo" : "Complete"}
//           </button>

//           <button onClick={() => deleteTodo(todo.id)}>
//             Delete
//           </button>
//         </div>
//       ))}
//     </div>
//   );
// }

// export default App;

// updated

import { useEffect, useState } from "react";

function App() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("all"); // all, active, completed

  // GET ALL TODOS
  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:3000/todos")
      .then((response) => response.json())
      .then((data) => {
        setTodos(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // CREATE TODO
  const createTodo = () => {
    if (!title.trim()) return;

    setLoading(true);
    fetch("http://localhost:3000/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title.trim(),
        is_completed: false,
      }),
    })
      .then((response) => response.json())
      .then((newTodo) => {
        setTodos([newTodo, ...todos]);
        setTitle("");
        setLoading(false);
      })
      .catch(() => setLoading(false));
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
    if (!window.confirm("Are you sure you want to delete this todo?")) return;
    
    fetch(`http://localhost:3000/todos/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then(() => {
        setTodos(todos.filter((todo) => todo.id !== id));
      });
  };

  // Handle Enter key
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      createTodo();
    }
  };

  // Filter todos
  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.is_completed;
    if (filter === "completed") return todo.is_completed;
    return true;
  });

  const completedCount = todos.filter((t) => t.is_completed).length;
  const activeCount = todos.length - completedCount;

  return (
    <div className="app-container">
      <div className="app-header">
        <h1>✨ Todo App</h1>
        <p className="subtitle">Stay organized and productive</p>
      </div>

      <div className="input-section">
        <div className="input-wrapper">
          <input
            type="text"
            placeholder="What needs to be done?"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            onKeyPress={handleKeyPress}
            disabled={loading}
            className="todo-input"
          />
          <button 
            onClick={createTodo} 
            disabled={!title.trim() || loading}
            className="add-button"
          >
            + Add Task
          </button>
        </div>
      </div>

      <div className="stats-section">
        <div className="stats">
          <span className="stat-item">
            <span className="stat-number">{todos.length}</span>
            <span className="stat-label">Total</span>
          </span>
          <span className="stat-item">
            <span className="stat-number">{activeCount}</span>
            <span className="stat-label">Active</span>
          </span>
          <span className="stat-item">
            <span className="stat-number">{completedCount}</span>
            <span className="stat-label">Completed</span>
          </span>
        </div>

        <div className="filter-buttons">
          <button
            className={`filter-btn ${filter === "all" ? "active" : ""}`}
            onClick={() => setFilter("all")}
          >
            All
          </button>
          <button
            className={`filter-btn ${filter === "active" ? "active" : ""}`}
            onClick={() => setFilter("active")}
          >
            Active
          </button>
          <button
            className={`filter-btn ${filter === "completed" ? "active" : ""}`}
            onClick={() => setFilter("completed")}
          >
            Completed
          </button>
        </div>
      </div>

      {loading && todos.length === 0 ? (
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Loading your todos...</p>
        </div>
      ) : filteredTodos.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">📋</div>
          <h3>No todos here</h3>
          <p>
            {filter === "all" 
              ? "Start by adding your first task above!" 
              : filter === "active" 
              ? "Great job! All tasks are completed! 🎉" 
              : "No completed tasks yet. Keep going!"}
          </p>
        </div>
      ) : (
        <div className="todo-list">
          {filteredTodos.map((todo) => (
            <div
              key={todo.id}
              className={`todo-item ${todo.is_completed ? "completed" : ""}`}
            >
              <button
                onClick={() => toggleTodo(todo)}
                className="toggle-button"
                aria-label={todo.is_completed ? "Undo" : "Complete"}
              >
                {todo.is_completed ? "✅" : "⬜"}
              </button>

              <span className="todo-title">{todo.title}</span>

              <div className="todo-actions">
                <button
                  onClick={() => toggleTodo(todo)}
                  className="action-btn undo-btn"
                  aria-label="Toggle status"
                >
                  {todo.is_completed ? "↩️" : "✅"}
                </button>
                <button
                  onClick={() => deleteTodo(todo.id)}
                  className="action-btn delete-btn"
                  aria-label="Delete todo"
                >
                  🗑️
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;