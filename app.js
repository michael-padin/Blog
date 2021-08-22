const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const _ = require("lodash");
const app = express();
const Posts = require("./models/posts");
require("dotenv").config();

const homeStartingContent =
  "Lacus vel facilisis volutpat est velit egestas dui id . Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent =
  "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent =
  "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

mongoose.connect(
  "mongodb://localhost:27017/blogDB",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (!err) {
      console.log("MongoDB Connection Succeeded.");
    } else {
      console.log("Error in DB connection: " + err);
    }
  }
);

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", function (req, res) {
  Posts.find({}, (err, foundPost) => {
    if (foundPost) {
      res.render("home", {
        homeContent: homeStartingContent,
        posts: foundPost,
      });
    } else {
      console.log(err);
    }
  });
});

app.get("/about", function (req, res) {
  res.render("about", { aboutContent: aboutContent });
});

app.get("/contact", function (req, res) {
  res.render("contact", { contactContent: contactContent });
});

app.get("/compose", function (req, res) {
  res.render("compose", { contactContent: contactContent });
});

app.post("/compose", function (req, res) {
  const title = _.capitalize(req.body.postTitle);
  const content = req.body.postContent;
  const post = new Posts({
    title: title,
    slug: _.kebabCase(req.body.postTitle),
    content: content,
  });

  if (title == "" && content == "") {
    res.redirect("/compose");
  } else {
    res.redirect("/");
    post.save();
  }
});

app.get("/posts/:topic", (req, res) => {
  let requestedTopic = req.params.topic.replace(/[_\s]+/g, "-").toLowerCase();

  Posts.find({}, (err, foundPost) => {
    foundPost.forEach((post) => {
      let storedTitle = post.title.replace(/[_\s]+/g, "-").toLowerCase();
      if (storedTitle === requestedTopic) {
        res.render("post", { post: post });
      } else {
        return err
      }
    });
  });
});

app.listen(5000, function () {
  console.log("Server started on port 3000");
});
