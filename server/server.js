const express = require("express");
const app = express();
const port = 3000;
const mysql = require("mysql");
const bodyParser = require("body-parser");

const bcrypt = require("bcrypt");
const saltRounds = 10;

const dotenv = require("dotenv");
dotenv.config();

//Modules
const login = require("./modules/login");
const register = require("./modules/register");
const checkData = require("./modules/checkData");
const findUsers = require("./modules/findUsers");
const findUser = require("./modules/findUser");

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

//Routes
app.post("/checkData", (req, res) => checkData.checkData(req, res, connection));

app.post("/register", (req, res) => {
  register.register(req, res, connection, bcrypt, saltRounds);
});

app.post("/login", (req, res) => login.login(req, res, connection, bcrypt));

app.post("/findUsers", (req, res) => findUsers.findUsers(req, res, connection));

app.post("/findUser", (req, res) => findUser.findUser(req, res, connection));

app.post("/followUser", (req, res) => {
  console.log(req.body);
  const sql = `UPDATE users SET followed_persons=IFNULL(",1",CONCAT(followed_persons,",1"))`;
  //UPDATE users SET followed_persons=IFNULL(",1",(CONCAT(followed_persons,",1")))
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
