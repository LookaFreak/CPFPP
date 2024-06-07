import React, { useEffect, useState } from "react";
import Navabar from "../../components/Navabar";
import Footer from "../../components/Footer";
import { message } from "antd";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

import { PlusOutlined } from '@ant-design/icons';
import { Image, Upload } from 'antd';
import ImgURL from "../../Utils/ImgUrlGen";






// these functions is for image uploading 
const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
};
const beforeUpload = (file) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    return console.log('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    return console.log('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
};

const Register = () => {
  let Location = useLocation()
  const navigate = useNavigate();

  let UserData = Location.state?.user

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  })
  const [file, setFile] = useState(null)
  const [imageUrl, setImageUrl] = useState(null)
  const [isDarkTheme, setIsDarkTheme] = useState(true);


  const enteringFormData = (event) => {
    let { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    })
  }
  const handleUploadChange = (info) => {
    getBase64(info.file.originFileObj, (url) => {
      setImageUrl(url);
    });
    setFile(info?.file?.originFileObj || null)
  };

  const uploadButton = (
    <div>
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );


  const handleRegister = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      message.error("No token found");
      return;
    }
    try {
      let Payload = new FormData()
      Object.keys(formData).map((key) => {
        Payload.append(key, formData[key])
      })
      if (file) {
        Payload.append("avatar", file)
      } else {
        // Payload.append("avatar", null)
      }

      const res = await axios.post(
        "http://localhost:8000/api/v1/auth/editprofile",
        Payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        }
      );
      if (res.data.success) {
        message.success(res.data.message);
        navigate("/profile");
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      message.error("Something went wrong");
    }
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


  useEffect(() => {
    if (UserData) {
      setFormData({
        name: UserData.name,
        email: UserData.email,
      })
      setImageUrl(ImgURL(UserData.avatar))
    }
  }, [])
  return (
    <div
      style={{ marginTop: "5rem" }}
      className={`${isDarkTheme ? "bg-light" : "bg-dark"}`}
    >
      <Navabar dark={isDarkTheme} Setdark={setIsDarkTheme} />
      <div className="login template d-flex justify-content-center align-items-center  100-vh">
        <div
          className=" p-5 rounded d-flex align-items-center"
          style={{
            height: "80vh",
            marginTop: "4rem",
            background: isDarkTheme ? "" : "#fff",
          }}
        >
          <form
            style={{
              width: width <= 500 ? "90%" : "500px",
            }}
            onSubmit={handleRegister}
          >
            <h3 className="mb-4">Edit Profile</h3>
            <div className="mb-4" style={{ display: "flex", justifyContent: "center" }}>
              <Upload
                name="image"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                beforeUpload={beforeUpload}
                onChange={handleUploadChange}
              >
                {imageUrl ? (
                  <div className="imgBox">
                    <img
                      src={imageUrl}
                      alt="avatar"
                      style={{
                        width: '100%',
                      }}
                    />
                  </div>
                ) : (
                  uploadButton
                )}
              </Upload>

            </div>
            <div className="mb-4">
              <input
                type="name"
                placeholder="Full Name"
                className="form-control"
                name="name"
                value={formData.name}
                onChange={enteringFormData}
              />
            </div>
            <div className="mb-4">
              <input
                type="email"
                placeholder="Email"
                className="form-control"
                disabled
                value={formData.email}
                onChange={enteringFormData}
              />
            </div>
            <div className="mb-4">
              <input
                type="password"
                placeholder="Password"
                className="form-control"
                name="password"
                value={formData.password}
                onChange={enteringFormData}
              />
            </div>

            <div className="d-grid mb-3">
              <button type="submit" className="btn btn-primary">
                Save
              </button>
            </div>

          </form>
        </div>
      </div>

      <Footer dark={isDarkTheme} />
    </div >
  );
};

export default Register;