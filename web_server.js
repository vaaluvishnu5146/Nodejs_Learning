const express = require("express");
const web_server = express();

web_server.get("/", (req, res, next) => {
  res.render("pages/home");
});

web_server.get("/tasks", (req, res, next) => {
  res.render("pages/tasks");
});

web_server.get("/about", (req, res, next) => {
  res.render("pages/about");
});

module.exports = web_server;
