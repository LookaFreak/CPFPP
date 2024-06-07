const express = require("express");
const { authenticate } = require("../midelwares/authentication");
const {
  createComment,
  getAllCommentByBlog,
  DeleteComment,
} = require("../controllers/commentController");

const router = express.Router();

// create comment
router.post("/comments/:blogId", authenticate, createComment);

// get all comments
router.get("/comments/:blogId", authenticate, getAllCommentByBlog);

// delete comment
router.delete("/comments/:id", authenticate, DeleteComment);
module.exports = router;
