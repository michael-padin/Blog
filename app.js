const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const app = express();
require("dotenv").config();
const router = require('./routes/router');


mongoose.connect(
  "mongodb://localhost:27017/blogDB",
 {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }, (err) => {
    if (!err) {
      console.log("MongoDB Connection Succeeded.");
    } else {
      console.log("Error in DB connection: " + err);
    }
  }
);

app.set("view engine", "ejs");
app.use(express.urlencoded({extended: true,}));
app.use(express.static("public"));
app.use(router);

app.listen(5000, function () {
  console.log("Server started on port 3000");
});
