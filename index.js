const express = require("express");
const bodyparser = require("body-parser");

const http_server = express();

// INJECT BODY-PARSER MIDDLEWARE
http_server.use(bodyparser.json());

let todos = [];

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

http_server.get("/", (req, res, next) => {
  console.log(req.query);
  res.send({ success: true, message: "Todos fetched successfully", todos });
});

http_server.post("/create", (req, res, next) => {
  todos.push({ ...req.body, id: getRandomInt(1000) });
  res.send({ success: true, message: "Todo saved successfully" });
});

http_server.put("/update/:id", (req, res, next) => {
  const filteredTodo = todos.filter((d) => d.id != req.params.id); // [{}, {}]
  filteredTodo.push(req.body);
  todos = [...filteredTodo];
  res.send({ success: true, message: "Todo updated" });
});

http_server.delete("/delete/:id", (req, res, next) => {
  const filteredTodo = todos.filter((d) => d.id != req.params.id); // [{}, {}] {}
  todos = [...filteredTodo];
  res.send({ success: true, message: "Todo deleted successfully" });
});

// starts a simple http server locally on port 3000
http_server.listen(3000, "0.0.0.0", () => {
  console.log("Listening on 127.0.0.1:3000");
});
