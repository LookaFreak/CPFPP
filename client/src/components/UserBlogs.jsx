import { message } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { CiHeart } from "react-icons/ci";
import { FaArrowRight, FaRegComment } from "react-icons/fa";

const UserBlogs = ({ id, dark }) => {
  console.log(id);
  const [userBlogs, SetuserBlogs] = useState([]);

  const getUserblogs = async () => {
    try {
      const res = await axios.get(`api/v1/blog/getBlogsById/${id}`);
      SetuserBlogs(res.data.blogs);
    } catch (error) {
      message.error("Something went wrong");
    }
  };
  useEffect(() => {
    getUserblogs();
  }, []);
  // to show less text
  const truncateText = (text, wordLimit) => {
    const words = text.split(" ");
    if (words.length <= wordLimit) {
      return text;
    }
    return words.slice(0, wordLimit).join(" ") + "...";
  };
  return (
    <div style={{ marginTop: "2rem", height: "100%" }}>
      <div className="text-center">
        <h2
          className={`display-4 display-md-3 display-lg-1 ${
            dark ? "text-dark" : "text-light"
          }`}
        >
          Your Blogs
        </h2>
      </div>
      <div className="container mt-5 ">
        <div className="row">
          {userBlogs.map((item) => (
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
                        <span className="blog-icon">
                          <CiHeart /> {item.likes}
                        </span>
                        <span className="blog-comment">
                          <FaRegComment /> {item.commentCount}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="buttons d-flex gap-2"
                  style={{ paddingLeft: "0.5rem", marginBottom: "0.6rem" }}
                >
                  <a
                    href={`/update-blog/${item._id}`}
                    type="button"
                    className="btn btn-warning"
                  >
                    Update
                  </a>
                  <button type="button" className="btn btn-danger">
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserBlogs;
