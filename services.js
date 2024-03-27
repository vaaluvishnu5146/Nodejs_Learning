const express = require("express");
const LoginShield = require("./middlewares/LoginShield");
const services = express();

services.use("/task", LoginShield, require("./controllers/Task.controller"));
services.use("/auth", require("./controllers/Authentication.controller"));

module.exports = services;
