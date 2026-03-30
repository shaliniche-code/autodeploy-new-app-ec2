// index.js
const http = require("http");

const server = http.createServer((req, res) => {
  res.end("Ho from NEW DevOps Deployment........ 🚀");
});

server.listen(3000);
