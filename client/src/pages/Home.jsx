import React, { useEffect, useState } from "react";
import Navabar from "../components/Navabar";
import home1 from "../assets/home1.jpg";
import { heredata } from "../data/data";
import Banner from "../components/Banner";
import BlogsPost from "../components/BlogsPost";
import Footer from "../components/Footer";
import LatestBlog from "../components/LatestBlog";
import axios from "axios";
import { message } from "antd";
import { useAuth } from "../Context/AuthContext";

const Home = () => {
  const [blog, setBlogs] = useState([]);
  const [isDarkTheme, setIsDarkTheme] = useState(true);
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
  return (
    <div className={`${isDarkTheme ? "bg-light" : "bg-dark"}`}>
      <Navabar dark={isDarkTheme} Setdark={setIsDarkTheme} />
      {/* Hero sections */}
      {/* <div style={{ height: "100vh", width: "100vw" }}> */}
      <div
        id="carouselExampleCaptions"
        className="carousel slide"
        style={{ width: "100%", height: "100%" }}
      >
        <div className="carousel-indicators">
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="0"
            className="active"
            aria-current="true"
            aria-label="Slide 1"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="1"
            aria-label="Slide 2"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="2"
            aria-label="Slide 3"
          ></button>
        </div>
        <div className="carousel-inner">
          {blog.map((data, index) => (
            <div
              className={`carousel-item  ${index === 0 ? "active" : ""}`}
              key={data._id}
            >
              <img
                src={data.image}
                className="w-100 d-block"
                style={{ height: "150%", objectFit: "fill" }}
                alt="..."
              />
              <div
                className={`carousel-caption ${isDarkTheme ? "#333" : "#fff"}`}
              >
                <h5 className="animated bounceInRight">{data.title}</h5>
                <p>{data.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      {/* <LatestBlog /> */}
      <Banner dark={isDarkTheme} />
      <BlogsPost dark={isDarkTheme} />
      <Footer dark={isDarkTheme} />
      {/* </div> */}
    </div>
  );
};

export default Home;

{
  /* <div
        id="carouselExampleCaptions"
        className="carousel slide"
        style={{ width: "100%", height: "100%" }}
      >
        <div className="carousel-indicators">
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="0"
            className="active"
            aria-current="true"
            aria-label="Slide 1"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="1"
            aria-label="Slide 2"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="2"
            aria-label="Slide 3"
          ></button>
        </div>
        <div className="carousel-inner">
          {heredata.map((data) => (
            <div className={`carousel-item  ${data.id == 1 ? "active" : ""}`}>
              <img
                src={data.image}
                className="w-100 d-block"
                style={{ height: "100%", objectFit: "cover" }}
                alt="..."
              />
              <div className="carousel-caption ">
                <h5 className="animated bounceInRight">First slide label</h5>
                <p>
                  Some representative placeholder content for the first slide.
                </p>
              </div>
            </div>
          ))}
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div> */
}
