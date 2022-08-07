const http = require("http");
const fs = require("fs");
const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  let path = "./";
  switch (req.url) {
    case "/index.js":
      path += "index.js";
      res.setHeader("Content-Type", "text/javascript");
      break;
    case "/style.css":
      path += "/style.css";
      res.setHeader("Content-Type", "text/css");
      break;
    default:
      path += "/index.html";
      res.setHeader("Content-Type", "text/html");
      break;
  }
  fs.readFile(path, (err, data) => {
    if (err) {
      console.error(err);
      res.end();
    } else {
      res.end(data);
    }
  });
});

server.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
