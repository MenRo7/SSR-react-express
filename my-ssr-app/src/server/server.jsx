const express = require("express");
const React = require("react");
const { renderToStaticMarkup } = require("react-dom/server");
const App = require("../App.jsx").default; // .default car import ESModule via esbuild

const app = express();
const PORT = 3000;

app.use(express.static("build"));

app.get("/", async (req, res) => {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/todos");
    if (!response.ok) throw new Error(`Erreur API: ${response.status}`);
    const todos = await response.json();

    const html = renderToStaticMarkup(React.createElement(App, { todos: todos.slice(0, 10) }));

    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.send(`<!DOCTYPE html>
<html lang="fr">
  <head>
    <meta charset="UTF-8" />
    <title>Liste des tâches</title>
  </head>
  <body>
    <div id="root">${html}</div>
  </body>
</html>`);
  } catch (error) {
    console.error(error);
    res.status(500).send("Erreur serveur");
  }
});

app.listen(PORT, () => {
  console.log(`Serveur lancé : http://localhost:${PORT}`);
});
