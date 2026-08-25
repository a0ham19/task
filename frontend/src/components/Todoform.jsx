// import { useState } from "react";
// import Item from "./Item";

// function Todoform() {
//   const [tasks, setTasks] = useState([]);
//   const [newTask, setNewTask] = useState("");

//   function addTask() {
//     if (newTask.trim() === "") return;

//     setTasks([...tasks, newTask]);
//     setNewTask("");
//   }

//   return (
//     <>
//       <div className="input-container">
//         <input
//           type="text"
//           value={newTask}
//           onChange={(e) => setNewTask(e.target.value)}
//           placeholder="Enter a task"
//         />

//         <button className="add-btn" onClick={addTask}>
//           +
//         </button>
//       </div>

//       <ul>
//         {tasks.map((task, index) => (
//           <Item key={index} text={task} />
//         ))}
//       </ul>
//     </>
//   );
// }

// export default Todoform;

import { useState } from "react";
import Item from "./Item";

function Todoform() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  function addTask() {
    if (newTask.trim() === "") return;

    setTasks([...tasks, newTask]);
    setNewTask("");
  }

  function deleteTask(index) {
    setTasks(tasks.filter((_, i) => i !== index));
  }

  return (
    <>
      <div className="input-container">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Enter a task"
        />

        <button className="add-btn" onClick={addTask}>
          +
        </button>
      </div>

      <ul>
        {tasks.map((task, index) => (
          <Item key={index} text={task} onDelete={() => deleteTask(index)} />
        ))}
      </ul>
    </>
  );
}

export default Todoform;
