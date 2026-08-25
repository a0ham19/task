import React from "react";

function Item({ text, onDelete }) {
  return (
    <>
      <li>
        <input type="checkbox" id="task1"></input>
        <label for="task1">{text}</label>
        <button className="del-btn" onClick={onDelete}>
          -
        </button>
      </li>
    </>
  );
}

export default Item;
