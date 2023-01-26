const http = require("http");

const hostname = "127.0.0.1";
const port = 3000;

const mysql = require("mysql2");

const dotenv = require("dotenv");
dotenv.config();

const register = require("./modules/register");
const checkData = require("./modules/checkData");

const server = http.createServer(async (req, res) => {
  const db = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWD,
    database: process.env.DBNAME,
  });

  //   const db = mysql.createConnection({
  //     host: "localhost",
  //     user: "root",
  //     password: "",
  //     database: "cinema",
  //   });

  switch (req.url) {
    case "/checkData":
      console.log("site");
      checkData(req, res, db);
      break;

    case "/register":
      register(req, res, db);
      break;
    default:
      res.statusCode = 200;
      res.setHeader("Content-Type", "text/plain");
      res.end(`${process.env.HOST}`);
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
