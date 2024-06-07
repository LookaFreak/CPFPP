const blogPostModel = require("../models/blogModel");
const userModel = require("../models/userModel");

exports.createBlog = async (req, res) => {
  const { id } = req.params;
  try {
    const { title, subtitle, description, image, createdAt, category } =
      req.body;
    if (!title || !description || !image || !category) {
      return res
        .status(401)
        .send({ success: false, message: "All fields are required" });
    }
    // console.log(res);
    const user = await userModel.findById(id);
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User is not Registerted",
      });
    }
    // create a save post
    const blogPost = new blogPostModel({
      title,
      subtitle,
      description,
      image,
      category,
      createdBy: user._id,
      createdAt,
    });
    const createBlog = await blogPost.save();
    return res.status(200).send({
      success: true,
      message: "Blog created successfully!",
      createBlog,
    });
  } catch (error) {
    res
      .status(401)
      .send({ success: false, message: `Register Failed ${error.message}` });
  }
};

exports.getAllBlog = async (req, res) => {
  try {
    // Define the time frame (last 7 days)
    const now = new Date();
    const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000); // 7 days ago

    const blogs = await blogPostModel
      .find({ createdAt: { $gte: oneWeekAgo } })
      .populate("createdBy")
      .sort({ createdAt: -1 }); // Populate 'createdBy' with User data
    return res.status(200).send({
      success: true,
      message: "Blogs fetched successfully!",
      blogs,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: `Error fetching blog posts: ${error.message}`,
    });
  }
};
exports.getLatestBlog = async (req, res) => {
  try {
    // Define the time frame (last 24 hours)
    const now = new Date();
    const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000); // 24 hours ago

    const blogs = await blogPostModel
      .find({ createdAt: { $gte: oneDayAgo } })
      .populate("createdBy")
      .sort({ createdAt: -1 })
      .limit(3); // Populate 'createdBy' with User data
    return res.status(200).send({
      success: true,
      message: "Blogs fetched successfully!",
      blogs,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: `Error fetching blog posts: ${error.message}`,
    });
  }
};
exports.getSingleBlog = async (req, res) => {
  const blogId = req.params.id;
  console.log(blogId, "heelo");
  try {
    const blog = await blogPostModel.findById(blogId).populate("createdBy");
    if (!blog) {
      return res.status(404).send({
        success: false,
        message: "Blog dose not find! please try again",
      });
    }

    res.status(200).send({
      success: true,
      message: "Blog find successfully",
      blog,
      // user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: `Error in Fetching Single blog post ${error}`,
    });
  }
};

exports.updateBlog = async (req, res) => {
  const { id } = req.params;
  try {
    const blog = await blogPostModel.findById(id);
    if (!blog) {
      return res.status(404).send({
        success: false,
        message: "Blog not found",
      });
    }

    if (req.body.title) {
      blog.title = req.body.title;
    }
    if (req.body.subtitle) {
      blog.subtitle = req.body.subtitle;
    }
    if (req.body.description) {
      blog.description = req.body.description;
    }
    if (req.body.category) {
      blog.description = req.body.category;
    }
    const updatedBlog = await blog.save();
    res.status(201).send({
      success: true,
      message: "Blog updated Successfully",
      updatedBlog,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: `Error in updating blog ${error}`,
    });
  }
};

// delete blog
exports.deleteBlog = async (req, res) => {
  const { id } = req.params;
  try {
    const blog = await blogPostModel.findById(id);
    if (!blog) {
      return res.status(400).send({
        success: false,
        message: "Blog not found",
      });
    }
    await blogPostModel.deleteOne({ _id: id });
    res.status(200).send({
      message: "Blog deleted Successfully",
      success: true,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: `Error in deleting the blog ${error}s`,
    });
  }
};

// Search blog post by category and title
exports.SearchBlog = async (req, res) => {
  const { query } = req.query;

  try {
    // Initialize an empty search criteria object
    let search = {};

    // Check if the query matches category or title criteria
    if (query) {
      // Assuming you have a way to distinguish between category and title
      // Here we check both
      search = {
        $or: [
          { category: new RegExp(query, "i") },
          { title: new RegExp(query, "i") },
        ],
      };
    }

    // Perform the search with the constructed search criteria
    const blogs = await blogPostModel.find(search).populate("createdBy");

    // Send the response with the search results
    res.status(200).send({
      success: true,
      blogs,
    });
  } catch (error) {
    // Handle any errors during the search process
    res.status(500).send({
      success: false,
      message: `Error in searching blogs: ${error.message}`,
    });
  }
};

exports.getBlogsByUserId = async (req, res) => {
  try {
    const userId = req.params.id;
    const blogs = await blogPostModel
      .find({
        createdBy: userId,
      })
      .populate("createdBy");
    res.status(200).send({ blogs });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.LikesBlog = async (req, res) => {
  const { blogId } = req.params;
  try {
    await blogPostModel.findByIdAndUpdate(
      blogId,
      { $inc: { likes: 1 } },
      { new: true } // Return the updated document
    );

    res.status(201).send({
      success: true,
      message: "Comment added successfully",
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: `Error in the likes button ${error}`,
    });
  }
};
