const fs = require("fs");
const http = require("http");
const host = "localhost";
const port = 8080;
const server = http.createServer();

server.on("request", (req, res) => {
    console.log(`Request URL: ${req.url}`);
    if (req.url === "/favicon.ico") {
        res.end();
    } else if (req.url === "/reset") {
        const stylesheet = fs.readFileSync("./reset.css");
        res.end(stylesheet);
    } else if (req.url === "/stylesheet") {
        const stylesheet = fs.readFileSync("./stylesheet.css");
        res.end(stylesheet);
    } else if (req.url === "/script") {
        const script = fs.readFileSync("./index.js");
        res.end(script);
    } else if (req.url === "/color-palette") {
        const palette = fs.readFileSync("./color-palette.js");
        res.end(palette);
    } else if (req.url === "/") {
        const index = fs.readFileSync("./index.html");
        res.end(index);
    } else {
        res.statusCode = 404;
        res.end("404 Not Found");
    }
});

server.listen(port, host, () => {
    console.log(`Server running at http://${host}:${port}/`);
});