const express = require("express");
const app = express();
const port = 3000;
const mysql = require("mysql");
const bodyParser = require("body-parser");

const bcrypt = require("bcrypt");
const saltRounds = 10;

const dotenv = require("dotenv");
dotenv.config();

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//MYSQL connect
const connection = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWD,
  database: process.env.DBNAME,
});

connection.connect();

// Add headers before the routes are defined
app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "*");

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);

  // Pass to next layer of middleware
  next();
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/checkData", (req, res) => {
  console.log(req.body);
  const email = req.body.email;
  const nick = req.body.nick;
  const sql =
    'SELECT `email`,`nick` FROM `users` WHERE `email`="' +
    email +
    '" OR `nick`="' +
    nick +
    '"';

  connection.query(sql, (err, rows, fields) => {
    if (err) throw err;

    console.log(rows);

    let obj = {
      free: "",
      errorMessage: "",
    };

    if (rows.length === 0) {
      obj.free = true;
      res.send(obj);
    } else {
      obj.free = false;
      if (rows[0].email === email) {
        obj.errorMessage = "Email is already used";
      } else {
        obj.errorMessage = "Nick is already used";
      }
      res.send(obj);
    }
  });
});

app.post("/register", (req, res) => {
  console.log(req.body);

  const hash = bcrypt.hashSync(req.body.password, saltRounds);

  console.log(hash);
  const sql = `INSERT INTO users(name,surname,email,password,phone,nick) VALUES ("${req.body.name}","${req.body.surname}","${req.body.email}","${hash}","${req.body.phone}","${req.body.nick}")`;

  connection.query(sql, (err, rows, fields) => {
    if (err) throw err;
    res.send("added");
  });
});

app.post("/login", (req, res) => {
  console.log(req.body);
  const sql = `SELECT * FROM users WHERE email="${req.body.email}"`;
  connection.query(sql, (err, rows, fields) => {
    if (err) throw err;
    let obj = {
      operation: false,
      data: "",
      errorMessage: "Something is wrong with email address or password",
    };
    console.log(rows);
    if (rows.length === 0) {
      console.log("finito");
      res.send(obj);
      return;
    }
    console.log("go");

    const result = bcrypt.compareSync(req.body.password, rows[0].password);
    console.log(result);

    if (result) {
      const sendingObj = {
        id: rows[0].id,
        name: rows[0].name,
        surname: rows[0].surname,
        email: rows[0].email,
        phone: rows[0].phone,
        nick: rows[0].nick,
      };
      obj.data = sendingObj;
      obj.operation = true;
      res.send(obj);
      return;
    }
    res.send(obj);
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
