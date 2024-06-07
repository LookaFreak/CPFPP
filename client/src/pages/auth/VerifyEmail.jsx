import React, { useEffect, useState } from "react";
import Navabar from "../../components/Navabar";
import Footer from "../../components/Footer";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { hideLoading, showLoading } from "../../redux/actions/alertSlice";
import { useNavigate, useLocation } from "react-router-dom";
import { message } from "antd";






const VerifyEmail = () => {
  const navigate = useNavigate();
  const Location = useLocation()

  let Email = Location.state?.email
  const [code, SetCode] = useState("");
  const [loading, setLoading] = useState(false)

  const [isDarkTheme, setIsDarkTheme] = useState(true);



  const handleVerify = async (event) => {
    event.preventDefault();
    setLoading(true)
    try {
      const res = await axios.post("http://localhost:8000/api/v1/auth/register/verify", {
        email: Email,
        code,
      });
      if (res.data.success) {
        message.success(res.data.message)
        navigate("/login");
      }
    } catch (error) {
      // alert(error);
      message.error("Something went wrong");
    }
    setLoading(false)
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

  // form handler
  return (
    <div
      style={{ marginTop: "5rem" }}
      className={`${isDarkTheme ? "bg-light" : "bg-dark"}`}
    >
      <Navabar dark={isDarkTheme} Setdark={setIsDarkTheme} />
      <div className="login  template d-flex justify-content-center align-items-center 100-w 100-vh">
        <div
          className="40-w p-5 rounded  d-flex align-items-center"
          style={{
            height: "60vh",
            marginTop: "4rem",
            background: isDarkTheme ? "" : "#fff",
          }}
        >
          <form
            style={{
              width: width <= 500 ? "90%" : "500px",
            }}
            onSubmit={handleVerify}
          >
            <h3 className="mb-4">Email Varification</h3>

            <div className="mb-4">
              <input
                type="password"
                placeholder="Enter Password"
                className="form-control"
                value={code}
                onChange={(e) => SetCode(e.target.value)}
                required
              />
            </div>
            <div className="d-grid mb-3">
              <button type="submit" className="btn btn-primary">
                Varify
              </button>
            </div>
          </form>
        </div>
      </div>

      <Footer dark={isDarkTheme} />
    </div>
  );
};

export default VerifyEmail;