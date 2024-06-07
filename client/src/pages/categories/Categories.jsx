import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navabar from "../../components/Navabar";
import Footer from "../../components/Footer";
import axios from "axios";
import { message } from "antd";
import { FaArrowRight, FaRegComment } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";

const Categories = () => {
  const { category } = useParams();
  const [blog, setBlogs] = useState([]);
  const [isDarkTheme, setIsDarkTheme] = useState(true);

  // get blogs from database
  const getBlog = async (category) => {
    try {
      const res = await axios.get("http://localhost:8000/api/v1/blog/search", {
        params: { category },
      });
      if (res.data && res.data.blogs) {
        setBlogs(res.data.blogs);
      } else {
        message.error("No blogs found for this category.");
      }
    } catch (error) {
      message.error(`Something went wrong: ${error.message}`);
    }
  };
  useEffect(() => {
    getBlog(category);
  }, [category]);
  // to show less text
  const truncateText = (text, wordLimit) => {
    const words = text.split(" ");
    if (words.length <= wordLimit) {
      return text;
    }
    return words.slice(0, wordLimit).join(" ") + "...";
  };

  const Liked = async (id) => {
    try {
      const like = await axios.post(`/api/v1/blog/likes/${id}`);
      if (!like) {
        message.error("Something went wrong 1");
      }
      message.success("liked");
      window.location.reload();
    } catch (error) {
      message.error("Something went wrong");
    }
  };

  return (
    <div className={`${isDarkTheme ? "bg-light" : "bg-dark"}`}>
      <Navabar dark={isDarkTheme} Setdark={setIsDarkTheme} />
      <div>
        <div className={`text-center`} style={{ paddingTop: "7rem" }}>
          <h2
            className={`display-4 display-md-3 display-lg-1  ${
              isDarkTheme ? "text-dark" : "text-light"
            }`}
          >
            News & Media
          </h2>
        </div>
        <div className="container ">
          <div className="row">
            {blog.map((item) => (
              <div className="col-lg-3 col-md-6 mt-5">
                <div className="card">
                  <div className="blog-image">
                    <img src={item.image} alt="" />
                    <div className="bg-warning tag">{item.category}</div>
                  </div>
                  <div className="blog-content">
                    <div className="blog-title">{item.title}</div>
                    <div className="blog-subtitle">{item.subtitle}</div>
                    <p className="blog-desc">
                      {truncateText(item.description, 10)}
                      <a href={`./blogs/detail/${item._id}`}>
                        {" "}
                        Read More <FaArrowRight />
                      </a>
                    </p>
                    <div className="blog-footer">
                      <div className="blog-avatar">
                        <img
                          src={item.createdBy?.avatar}
                          alt={item.createdBy?.name}
                        />
                      </div>
                      <div>
                        <span className="blog-author">
                          {item.createdBy?.name}
                        </span>
                        <div
                          className="blog-post text-dark"
                          style={{ fontSize: "1.2rem" }}
                        >
                          <span
                            className="blog-icon"
                            onClick={() => {
                              Liked(item._id);
                            }}
                          >
                            <CiHeart /> {item.likes}
                          </span>
                          <span className="blog-comment">
                            <FaRegComment /> {item.commentCount}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {/* ))} */}
          </div>
        </div>
      </div>
      <Footer dark={isDarkTheme} />
    </div>
  );
};

export default Categories;
