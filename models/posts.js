const mongoose = require("mongoose");
Schema = mongoose.Schema;

const postsSchema = new Schema({
  title: { type: String },
  slug: { type: String },
  content: { type: String },
});

module.exports = mongoose.model("Post", postsSchema);
