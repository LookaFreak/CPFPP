import React, { useState } from "react";
import Navabar from "../../components/Navabar";
import Footer from "../../components/Footer";
import { message } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { categories } from "../../data/data";

const Createblogs = () => {
  const [title, SetTitle] = useState("");
  const [subtitle, Setsubtitle] = useState("");
  const [image, Setimage] = useState("");
  const [description, Setdescription] = useState("");
  const [category, Setcategory] = useState("");
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);

  const handleRegister = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.post(`/api/v1/blog/create-blog/${user._id}`, {
        title,
        subtitle,
        description,
        image,
        category,
      });
      if (res.data.success) {
        message.success("Blog Created successfully");
        navigate("/");
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      message.error("Something went wrong");
    }
  };

  const handleChange = (event) => {
    const selectedCategory = event.target.value;
    Setcategory(selectedCategory);
  };

  return (
    <div style={{ marginTop: "5rem" }}>
      <Navabar />
      <div className="login template d-flex justify-content-center align-items-center  100-vh">
        <div
          className=" p-5 rounded d-flex align-items-center"
          style={{ height: "100vh" }}
        >
          <form className="login-form" onSubmit={handleRegister}>
            <h3 className="mb-4">Create Blog</h3>
            <div className="mb-4">
              <input
                type="text"
                placeholder="Blog Title"
                className="form-control"
                value={title}
                onChange={(e) => SetTitle(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <input
                type="text"
                placeholder="Blog Subtitle"
                className="form-control"
                value={subtitle}
                onChange={(e) => Setsubtitle(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <textarea
                className="form-control"
                id="comment"
                rows="5"
                value={description}
                onChange={(e) => Setdescription(e.target.value)}
                required
              ></textarea>
            </div>
            <div className="mb-4">
              <input
                type="text"
                placeholder="Image URL"
                className="form-control"
                value={image}
                onChange={(e) => Setimage(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <select
                id="categorySelect"
                className="form-control"
                value={category}
                onChange={handleChange}
              >
                <option value="" disabled>
                  Select a category
                </option>
                {categories.map((data, index) => (
                  <option key={index} value={data.name}>
                    {data.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="d-grid mb-3">
              <button type="submit" className="btn btn-primary">
                Create Blog
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Createblogs;
