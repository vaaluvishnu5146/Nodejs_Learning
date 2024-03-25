const express = require("express");
const bodyparser = require("body-parser");
const { connectToDatabase } = require("./dbconfig");

// Enabling local env variables
require("dotenv").config();
// Initiate DB Connection
connectToDatabase();

const http_server = express();

// http_server.use(express.static("views"));

// set the view engine to ejs
http_server.set("view engine", "ejs");

// INJECT BODY-PARSER MIDDLEWARE
http_server.use(bodyparser.json());

http_server.use("/api", require("./services"));
http_server.use("/", require("./web_server"));

// starts a simple http server locally on port 3000
http_server.listen(process.env.PORT, process.env.HOSTNAME, () => {
  console.log("Server started");
});
