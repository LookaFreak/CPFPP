import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Navabar from "../../components/Navabar";
import Footer from "../../components/Footer";
import { message } from "antd";
import axios from "axios";
import UserBlogs from "../../components/UserBlogs";
import ImgURL from "../../Utils/ImgUrlGen";
import { MdEdit } from "react-icons/md";
import { useNavigate } from "react-router-dom";




const Protfile = () => {
  const Navigate = useNavigate()

  const [user, setUser] = useState(null);
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  const getUser = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      message.error("No token found");
      return;
    }

    try {
      const res = await axios.get("/api/v1/auth/getuser", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(res.data.user);
      console.log(res.data.user);
    } catch (error) {
      message.error("Something went wrong");
    }
  };

  useEffect(() => {
    getUser();
  }, []); // The empty array ensures this runs only once after the initial render

  if (!user) {
    return <div>Loading...</div>; // Or any other loading indicator
  }
  return (
    <div className={`${isDarkTheme ? "bg-light" : "bg-dark"}`}>
      <Navabar dark={isDarkTheme} Setdark={setIsDarkTheme} />
      <div
        className="d-flex flex-column justify-content-center align-items-center"
        style={{ height: "100%", padding: "8rem 0.5rem" }}
      >
        <div
          className="card d-flex justify-content-center align-items-center"
          style={{ width: "20rem", padding: "1rem" }}
        >
          <img
            src={ImgURL(user.avatar)}
            className="card-img-top"
            style={{ height: "100px", width: "100px", borderRadius: "50%" }}
            alt="..."
          />
          <div className="card-body text-center">
            <h5 className="card-title">{user.name}</h5>
            <p className="card-text">{user.email}</p>
          </div>
          <div className="editIcon" onClick={() => Navigate("/editprofile", { state: { user } })}><MdEdit /></div>
        </div>
        <UserBlogs id={user._id} dark={isDarkTheme} />
      </div>

      <Footer dark={isDarkTheme} />
    </div>
  );
};

export default Protfile;
