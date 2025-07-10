// src/server/server.jsx
import express from "express";
import React2 from "react";
import { renderToStaticMarkup } from "react-dom/server";

// src/App.jsx
import React from "react";
function App({ todos }) {
  return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h1", null, "Liste des t\xE2ches"), /* @__PURE__ */ React.createElement("ul", null, todos.map((todo) => /* @__PURE__ */ React.createElement("li", { key: todo.id }, todo.title, " ", todo.completed ? "\u2705" : "\u274C"))));
}

// src/server/server.jsx
var app = express();
var PORT = 3e3;
app.use(express.static("build"));
app.get("/", async (req, res) => {
  const response = await fetch("https://jsonplaceholder.typicode.com/todos");
  const todos = await response.json();
  const html = renderToStaticMarkup(/* @__PURE__ */ React2.createElement(App, { todos: todos.slice(0, 10) }));
  res.send(`
    <!DOCTYPE html>
    <html lang="fr">
      <head>
        <meta charset="UTF-8" />
        <title>Liste des t\xE2ches</title>
      </head>
      <body>
        <div id="root">${html}</div>
      </body>
    </html>
  `);
});
app.listen(PORT, () => {
  console.log(`\u2705 Serveur lanc\xE9 : http://localhost:${PORT}`);
});
