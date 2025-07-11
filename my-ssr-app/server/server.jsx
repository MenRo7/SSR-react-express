import fs from "fs";
import express from "express";
import React from "react";
import ReactDOMServer from "react-dom/server";
import App from "../src/App.jsx";

const path = require("path");
const __dirname = __dirname;

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.static(path.resolve(__dirname, "../dist"), { maxAge: "30d" }));

app.get("/", async (req, res) => {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/todos");
    const todos = await response.json();
    const appHtml = ReactDOMServer.renderToString(<App todos={todos.slice(0, 10)} />);

    const templateFile = path.resolve(__dirname, "../index.html");
    fs.readFile(templateFile, "utf8", (err, htmlTemplate) => {
      if (err) {
        console.error("Erreur lecture index.html :", err);
        return res.status(500).send("Erreur serveur");
      }

      const finalHtml = htmlTemplate
        .replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`)
        .replace(
          "</body>",
          `<script>window.__INITIAL_DATA__ = ${JSON.stringify(todos.slice(0, 10))}</script></body>`
        );

      res.setHeader("Content-Type", "text/html; charset=utf-8");
      res.send(finalHtml);
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Erreur API");
  }
});

app.listen(PORT, () => {
  console.log(`Serveur lancé sur http://localhost:${PORT}`);
});
