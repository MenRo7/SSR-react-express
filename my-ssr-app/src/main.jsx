import React from "react";
import { hydrateRoot } from "react-dom/client";
import App from "./App.jsx";

const initialTodos = window.__INITIAL_DATA__;

hydrateRoot(
  document.getElementById("root"),
  <React.StrictMode>
    <App todos={initialTodos} />
  </React.StrictMode>
);
