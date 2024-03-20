const { createServer } = require("node:http");
const { createFileAndWriteToFile, readFileAndPrint } = require("./filesystem");

const server = createServer((req, res) => {
  readFileAndPrint();
  res.writeHead(200, { "Content-Type": "text/html" });
  res.end(`<h1 class="test">How are you all!\n</h1>`);
});

// starts a simple http server locally on port 3000
server.listen(3000, "127.0.0.1", () => {
  console.log("Listening on 127.0.0.1:3000");
});
