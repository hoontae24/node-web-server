const http = require("http");
const mysql = require("mysql");

const db = mysql.createConnection({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "root",
  port: process.env.DB_PORT || "3306",
  database: process.env.DB_NAME || "node-web-server",
});


const server = http.createServer((req, res) => {
  console.log('income:', req.url);

  db.query("show databases;", (err, result, fields) => {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.write(JSON.stringify({ url: req.url, data: err || result }, undefined, 2));
    res.end();
  });
});

db.connect((err) => {
  console.log(err || "The database connected.");
  server.listen(process.env.PORT || 3000, () => console.log(`Server is started on ${process.env.PORT}`));
});

