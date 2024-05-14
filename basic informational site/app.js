const http = require("http");
const path = require("path");
const fs = require("path");

const server = http.createServer((req, res) => {
  if (req.url === "/") res.end("Home");
  else res.end("ERROR 404");
});
const PORT = 80;
server.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
