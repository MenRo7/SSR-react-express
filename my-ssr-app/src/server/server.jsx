import express from "express";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import App from "../App.jsx";

const app = express();
const PORT = 3000;

app.use(express.static("build"));

app.get("/", async (req, res) => {
  const response = await fetch("https://jsonplaceholder.typicode.com/todos");
  const todos = await response.json();

  const html = renderToStaticMarkup(<App todos={todos.slice(0, 10)} />);

  res.send(`
    <!DOCTYPE html>
    <html lang="fr">
      <head>
        <meta charset="UTF-8" />
        <title>Liste des tâches</title>
      </head>
      <body>
        <div id="root">${html}</div>
      </body>
    </html>
  `);
});

app.listen(PORT, () => {
  console.log(`✅ Serveur lancé : http://localhost:${PORT}`);
});
