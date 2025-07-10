var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/App.jsx
var App_exports = {};
__export(App_exports, {
  default: () => App
});
function App({ todos }) {
  return /* @__PURE__ */ import_react.default.createElement("div", null, /* @__PURE__ */ import_react.default.createElement("h1", null, "Liste des t\xE2ches"), /* @__PURE__ */ import_react.default.createElement("ul", null, todos.map((todo) => /* @__PURE__ */ import_react.default.createElement("li", { key: todo.id }, todo.title, " ", todo.completed ? "completed" : "NOT completed"))));
}
var import_react;
var init_App = __esm({
  "src/App.jsx"() {
    import_react = __toESM(require("react"));
  }
});

// src/server/server.jsx
var express = require("express");
var React2 = require("react");
var { renderToStaticMarkup } = require("react-dom/server");
var App2 = (init_App(), __toCommonJS(App_exports)).default;
var app = express();
var PORT = 3e3;
app.use(express.static("build"));
app.get("/", async (req, res) => {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/todos");
    if (!response.ok) throw new Error(`Erreur API: ${response.status}`);
    const todos = await response.json();
    const html = renderToStaticMarkup(React2.createElement(App2, { todos: todos.slice(0, 10) }));
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.send(`<!DOCTYPE html>
<html lang="fr">
  <head>
    <meta charset="UTF-8" />
    <title>Liste des t\xE2ches</title>
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
  console.log(`Serveur lanc\xE9 : http://localhost:${PORT}`);
});
//# sourceMappingURL=server.js.map
