const bodyParser = require("body-parser");
const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const Post = require("./models/post");
const postsRoutes = require("./routes/posts");

const app = express();

mongoose
  .connect(
    "mongodb+srv://test-user:AdyaShilpee@cluster0.zm17es2.mongodb.net/node-angular?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    console.log("Connected to Database!");
  })
  .catch(() => {
    console.log("Connection failed");
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/images/", express.static(path.join("backend/images/")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

app.use("/api/posts", postsRoutes);

module.exports = app;
