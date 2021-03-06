const _ = require("lodash");
const express = require("express");
const router = express.Router();
const Posts = require("../models/posts");

const homeStartingContent =
  "Praesent sapien massa, convallis a pellentesque nec, egestas non nisi. Curabitur aliquet quam id dui posuere blandit. Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem. Praesent sapien massa, convallis a pellentesque nec, egestas non nisi. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus suscipit tortor eget felis porttitor volutpat. Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem. Cras ultricies ligula sed magna dictum porta. ";
const aboutContent =
  "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent =
  "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

router.get("/", function (req, res) {
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

router.get("/about", function (req, res) {
  res.render("about", {
    aboutContent: aboutContent,
  });
});

router.get("/contact", function (req, res) {
  res.render("contact", {
    contactContent: contactContent,
  });
});

router.get("/compose", function (req, res) {
  res.render("compose", {
    contactContent: contactContent,
  });
});

router.post("/compose", function (req, res) {
  const title = _.capitalize(req.body.postTitle);
  const content = req.body.postContent;
  const post = new Posts({
    title: title,
    slug: _.kebabCase(req.body.postTitle),
    content: content,
  });

  if (title === "" || content === "") {
    res.redirect("/compose");
  } else {
    res.redirect("/");
    post.save();
  }
});

router.get("/posts/:topic", (req, res) => {
  let requestedTopic = req.params.topic;

  Posts.findById(requestedTopic, (err, foundPost) => {
    if (foundPost) {
      res.render("post", {
        post: foundPost,
      });
    } else {
      return "error";
    }
  });
});

module.exports = router;
