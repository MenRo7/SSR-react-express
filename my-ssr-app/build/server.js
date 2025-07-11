var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// server/server.jsx
var import_fs = __toESM(require("fs"));
var import_express = __toESM(require("express"));
var import_react2 = __toESM(require("react"));
var import_server = __toESM(require("react-dom/server"));

// src/App.jsx
var import_react = __toESM(require("react"));
function App({ todos }) {
  return /* @__PURE__ */ import_react.default.createElement("div", null, /* @__PURE__ */ import_react.default.createElement("h1", null, "Liste des t\xE2ches"), /* @__PURE__ */ import_react.default.createElement("ul", null, todos.map((todo) => /* @__PURE__ */ import_react.default.createElement("li", { key: todo.id }, todo.title, " ", todo.completed ? "completed" : "NOT completed"))));
}

// server/server.jsx
var path = require("path");
var __dirname = __dirname;
var PORT = process.env.PORT || 3e3;
var app = (0, import_express.default)();
app.use(import_express.default.static(path.resolve(__dirname, "../dist"), { maxAge: "30d" }));
app.get("/", async (req, res) => {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/todos");
    const todos = await response.json();
    const appHtml = import_server.default.renderToString(/* @__PURE__ */ import_react2.default.createElement(App, { todos: todos.slice(0, 10) }));
    const templateFile = path.resolve(__dirname, "../index.html");
    import_fs.default.readFile(templateFile, "utf8", (err, htmlTemplate) => {
      if (err) {
        console.error("Erreur lecture index.html :", err);
        return res.status(500).send("Erreur serveur");
      }
      const finalHtml = htmlTemplate.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`).replace(
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
  console.log(`Serveur lanc\xE9 sur http://localhost:${PORT}`);
});
//# sourceMappingURL=server.js.map
