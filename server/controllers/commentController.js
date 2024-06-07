const commentModel = require("../models/commentModel");
const postBlogModel = require("../models/blogModel");
const userModel = require("../models/userModel");
exports.createComment = async (req, res) => {
  const { blogId } = req.params;
  try {
    const { comment } = req.body;
    const userId = req.body.userId;

    const blogs = await postBlogModel.findById(blogId);
    const users = await userModel.findById(userId);
    const savedComment = await commentModel.create({
      user: users._id,
      blog: blogs._id,
      comment,
    });
    await postBlogModel.findByIdAndUpdate(
      blogId,
      { $inc: { commentCount: 1 } },
      { new: true } // Return the updated document
    );

    res.status(201).send({
      savedComment,
      success: true,
      message: "Comment added successfully",
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: `Error in create Comment ${error}`,
    });
  }
};

exports.getAllCommentByBlog = async (req, res) => {
  try {
    const blogId = req.params.blogId;
    const commentss = await commentModel
      .find({ blog: blogId })
      .populate("blog")
      .populate("user");

    res.status(200).send({
      success: true,
      message: "comment get successfully",
      commentss,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: `Error in get Comment ${error}`,
    });
  }
};

// Delete a comment by the user
exports.DeleteComment = async (req, res) => {
  try {
    const commentId = req.params.id;
    const userId = req.body.userId;
    const comment = await commentModel.findById(commentId);
    console.log(comment);
    if (!comment) {
      res
        .status(400)
        .send({ success: false, message: "User dose not have comment" });
    }
    if (comment.user.toString() !== userId.toString()) {
      return res
        .status(403)
        .json({ error: "User not authorized to delete this comment" });
    }
    await commentModel.findByIdAndDelete(commentId);
    res
      .status(200)
      .send({ success: true, message: "Comment Deleted Successfully" });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: `Error in delete comment ${error}`,
    });
  }
};
