const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Blog title is required"],
  },
  subtitle: {
    type: String,
  },
  description: {
    type: String,
  },
  image: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "user", // Correct reference
  },
  category: {
    type: String,
    enum: {
      values: [
        "Mercato",
        "News",
        "SerieB",
        "Video",
        "Primavera",
        "Opinioni",
        "Meme",
        "SerieA",
      ],
      message: "{VALUE} is not supported.",
    },
  },
  commentCount: { type: Number, default: 0 },
  likes: { type: Number, default: 0 },
});

const blogPostModel = mongoose.model("BlogPost", blogSchema); // Ensure consistent model naming

module.exports = blogPostModel;
