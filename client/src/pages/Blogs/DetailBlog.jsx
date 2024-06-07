import React, { useEffect, useState } from "react";
import Navabar from "../../components/Navabar";
import Footer from "../../components/Footer";
import { blogs } from "../../data/data";
import { useNavigate, useParams } from "react-router-dom";
import { CiHeart, CiTimer } from "react-icons/ci";
import { FaRegComment } from "react-icons/fa";
import Comments from "../../components/Comments";
import axios from "axios";
import { message } from "antd";
const DetailBlog = () => {
  const { id } = useParams();
  const [blog, setBlogs] = useState([]);
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  const getBlog = async () => {
    try {
      const res = await axios.get(`/api/v1/blog/blogSingle/${id}`);

      if (res.data.success) {
        setBlogs(res.data.blog);
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

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  return (
    <div className={`${isDarkTheme ? "bg-light" : "bg-dark"}`}>
      <Navabar dark={isDarkTheme} Setdark={setIsDarkTheme} />
      <div
        className="container  mb-5"
        style={{ color: "#333", marginTop: "5rem", paddingTop: "2rem" }}
      >
        <span className={`fs-5  ${isDarkTheme ? "text-dark" : "text-light"}`}>
          {formatDate(blog.createdAt)}
        </span>
        <h3
          className={`custom-width mx-auto mt-1 ${
            isDarkTheme ? "text-dark" : "text-light"
          }`}
        >
          {blog.title}
        </h3>
        <img src={blog.image} alt="" className="img-fluid mt-5 detail-blog" />
        <h5
          className={`mt-5 fw-bold ${isDarkTheme ? "text-dark" : "text-light"}`}
        >
          {blog.subtitle}
        </h5>
        <p
          style={{ maxWidth: "80ch", fontSize: "16px" }}
          className={`${isDarkTheme ? "text-dark" : "text-light"}`}
        >
          {blog.description}
        </p>
        {/* blog footer */}
        <div className="blog-footer d-flex align-items-center gap-2">
          <div className="blog-avatar">
            <img
              src={`${blog.createdBy?.avatar}`}
              alt=""
              style={{
                width: "4rem",
                height: "4rem",
                borderRadius: "50%",
              }}
            />
          </div>
          <div style={{ marginLeft: "1rem" }}>
            <span
              className={`blog-author ${
                isDarkTheme ? "text-dark" : "text-light"
              }`}
            >
              {blog.createdBy?.name}
            </span>
            <div
              className={`blog-post ${
                isDarkTheme ? "text-dark" : "text-light"
              }`}
            >
              <span className={`${isDarkTheme ? "text-dark" : "text-light"}`}>
                <CiHeart /> {blog.likes}
              </span>
              <span
                className={`blog-comment ${
                  isDarkTheme ? "text-dark" : "text-light"
                }`}
                style={{ marginLeft: "15px" }}
              >
                <FaRegComment /> {blog.commentCount}
              </span>
            </div>
          </div>
        </div>
      </div>
      <Comments id={blog._id} dark={isDarkTheme} />

      <Footer dark={isDarkTheme} />
    </div>
  );
};

export default DetailBlog;
