const express = require("express");
const {
  createBlog,
  getAllBlog,
  getSingleBlog,
  updateBlog,
  deleteBlog,
  SearchBlog,
  LikesBlog,
  getLatestBlog,
  getBlogsByUserId,
} = require("../controllers/blogController");
const { authenticate } = require("../midelwares/authentication");
const router = express.Router();

// create blog
router.post("/create-blog/:id", createBlog);

// get Blog
router.get("/blogs", getAllBlog);

// get latest created blogs
router.get("/latestblogs", getLatestBlog);

// get single blog by id
router.get("/blogSingle/:id", getSingleBlog);

// update blog
router.put("/update-blog/:id", authenticate, updateBlog);

// delete Blog
router.delete("/delete-blog/:id", authenticate, deleteBlog);

// search blog
router.get("/search", SearchBlog);

router.get("/getBlogsById/:id", getBlogsByUserId);

// likes blog
router.post("/likes/:blogId", LikesBlog);

module.exports = router;
