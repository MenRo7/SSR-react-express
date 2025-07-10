import React from "react";

export default function App({ todos }) {
  return (
    <div>
      <h1>Liste des tâches</h1>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            {todo.title} {todo.completed ? "completed" : "NOT completed"}
          </li>
        ))}
      </ul>
    </div>
  );
}
