const express = require("express");
const app = express();
const port = 3000;
const mysql = require("mysql");
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(
  cors({
    origin: "*",
  })
);

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
const followUser = require("./modules/followUser");
const unfollowUser = require("./modules/unfollowUser");
const getUserData = require("./modules/getUserData");
const addPost = require("./modules/addPost");
const getUserPosts = require("./modules/getUserPosts");
const likePost = require("./modules/likePost");
const dislikePost = require("./modules/dislikePost");
const getPosts = require("./modules/getPosts");

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

  res.setHeader("Access-Control-Allow-Origin", req.headers.origin);

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);

  // Pass to next layer of middleware
  if ("OPTIONS" == req.method) {
    res.send(200);
  } else {
    next();
  }
});

//Routes
app.get("/checkData", (req, res) => checkData.checkData(req, res, connection));

app.post("/register", (req, res) => {
  register.register(req, res, connection, bcrypt, saltRounds);
});

app.get("/login", (req, res) => login.login(req, res, connection, bcrypt));

app.get("/findUsers", (req, res) => findUsers.findUsers(req, res, connection));

app.get("/findUser", (req, res) => findUser.findUser(req, res, connection));

app.put("/followUser", (req, res) =>
  followUser.followUser(req, res, connection)
);

app.put("/unfollowUser", (req, res) =>
  unfollowUser.unfollowUser(req, res, connection)
);

app.get("/getUserData", (req, res) =>
  getUserData.getUserData(req, res, connection)
);

app.post("/addPost", (req, res) => addPost.addPost(req, res, connection));

app.get("/getUserPosts", (req, res) =>
  getUserPosts.getUserPosts(req, res, connection)
);

app.put("/likePost", (req, res) => likePost.likePost(req, res, connection));

app.put("/dislikePost", (req, res) =>
  dislikePost.dislikePost(req, res, connection)
);

app.get("/getPosts", (req, res) => getPosts.getPosts(req, res, connection));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
