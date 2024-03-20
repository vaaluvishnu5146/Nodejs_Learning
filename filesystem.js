const { writeFile, readFile } = require("node:fs");

function callback(err) {
  if (err) console.log(err);
  else console.log("File created successfully");
}

function createFileAndWriteToFile() {
  writeFile("files/message.txt", "Hello Node.js", "utf8", callback);
}

function readFileAndPrint() {
  readFile("files/message.txt", (err, data) => {
    if (err) console.log(err);
    else console.log(data.toString());
  });
}

module.exports = {
  createFileAndWriteToFile,
  readFileAndPrint,
};
