import React, { useEffect, useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination } from "swiper/modules";

import { FaRegComment, FaArrowRight } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import axios from "axios";
import { message } from "antd";

const LatestBlog = () => {
  const [blog, setBlogs] = useState([]);

  // get blogs from database
  const getBlog = async () => {
    try {
      const res = await axios.get("/api/v1/blog/latestblogs");

      if (res.data.success) {
        setBlogs(res.data.blogs);
      } else {
        message.error("Something went wrong, please wait");
      }
    } catch (error) {
      message.error("Somthing web wrong");
    }
  };

  useEffect(() => {
    getBlog();
  }, []);

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
    <>
      <div className="text-center">
        <h2 className="display-4 display-md-3 display-lg-1">News & Media</h2>
      </div>
      <div className="container mt-5 ">
        <Swiper
          slidesPerView={1}
          spaceBetween={10}
          pagination={{
            clickable: true,
          }}
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 40,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 50,
            },
          }}
          modules={[Pagination]}
          className="mySwiper"
        >
          {blog.map((item) => (
            <SwiperSlide>
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
            </SwiperSlide>
          ))}
          {/* ))} */}
        </Swiper>
      </div>
    </>
  );
};

export default LatestBlog;
