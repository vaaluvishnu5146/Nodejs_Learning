const express = require("express");
const services = express();

services.use("/task", require("./controllers/Task.controller"));
services.use("/auth", require("./controllers/Authentication.controller"));

module.exports = services;
