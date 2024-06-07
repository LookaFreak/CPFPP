import React, { useEffect, useState } from "react";
import Navabar from "../../components/Navabar";
import Footer from "../../components/Footer";
import { message } from "antd";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { categories } from "../../data/data";

const UpdateBlog = () => {
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [blog, setBlog] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  console.log(id);

  // get blogs detail
  const getBlog = async () => {
    try {
      const res = await axios.get(`/api/v1/blog/blogSingle/${id}`);

      if (res.data.success) {
        console.log(res.data.blog);
        setBlog(res.data.blog);
        setTitle(res.data.blog.title);
        setSubtitle(res.data.blog.subtitle);
        setImage(res.data.blog.image);
        setDescription(res.data.blog.description);
        setCategory(res.data.blog.category);
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      message.error(`Something went wrong`);
    }
  };
  useEffect(() => {
    getBlog();
  }, []);

  const handleUpdate = async (event) => {
    event.preventDefault();

    // Retrieve token from localStorage or wherever it's stored
    const token = localStorage.getItem("token");

    try {
      const res = await axios.put(
        `http://localhost:8000/api/v1/blog/update-blog/${id}`,
        {
          title,
          subtitle,
          description,
          image,
          category,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data.success) {
        message.success("Blog Updated successfully");
        navigate("/");
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      message.error("Something went wrong");
    }
  };
  const handleChange = (event) => {
    const selectedCategory = event.target.value;
    setCategory(selectedCategory);
  };

  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup function to remove the event listener when component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      style={{ marginTop: "5rem" }}
      className={`${isDarkTheme ? "bg-light" : "bg-dark"}`}
    >
      <Navabar dark={isDarkTheme} Setdark={setIsDarkTheme} />
      <div className="login  template d-flex justify-content-center align-items-center  100-vh">
        <div
          className=" p-5 rounded d-flex align-items-center justify-content-center"
          style={{
            height: "60vh",
            marginTop: "4rem",
            background: isDarkTheme ? "" : "#fff",
          }}
        >
          <form
            style={{ width: width <= 500 ? "90%" : "500px" }}
            onSubmit={handleUpdate}
          >
            <h3 className="mb-4">Update Blog</h3>
            <div className="mb-4">
              <input
                type="text"
                placeholder="Title"
                className="form-control"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <input
                type="text"
                placeholder="Subtitle"
                className="form-control"
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <textarea
                className="form-control"
                id="comment"
                placeholder="Description"
                rows="5"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
            <div className="mb-4">
              <input
                type="text"
                placeholder="Image URL"
                className="form-control"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <select
                id="categorySelect"
                className="form-control"
                value={category}
                onChange={handleChange}
              >
                <option value="">Select Category</option>
                {categories.map((data, index) => (
                  <option key={index} value={data.name}>
                    {data.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="d-grid mb-3">
              <button type="submit" className="btn btn-primary">
                Update Blog
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer dark={isDarkTheme} />
    </div>
  );
};

export default UpdateBlog;
