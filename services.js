const express = require("express");
const services = express();

services.use("/task", require("./controllers/Task.controller"));

module.exports = services;
