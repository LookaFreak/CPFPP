const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const commentSchema = new mongoose.Schema({
  blog: { type: Schema.Types.ObjectId, ref: "BlogPost", required: true },
  user: { type: Schema.Types.ObjectId, ref: "user", required: true },
  comment: { type: String, required: true },
  commentDate: { type: Date, default: Date.now },
});

const commentModel = mongoose.model("comment", commentSchema);

module.exports = commentModel;
