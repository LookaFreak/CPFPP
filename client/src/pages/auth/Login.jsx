import React, { useEffect, useState } from "react";
import Navabar from "../../components/Navabar";
import Footer from "../../components/Footer";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { hideLoading, showLoading } from "../../redux/actions/alertSlice";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import { useAuth } from "../../Context/AuthContext";
const Login = () => {
  const navigate = useNavigate();
  const [email, Setemail] = useState("");
  const [password, Setpassword] = useState("");
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  const { login } = useAuth();
  const handlLogin = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.post("http://localhost:8000/api/v1/auth/login", {
        email,
        password,
      });
      if (res.data.success) {
        const data = [res.data.user.name, res.data.user.email];
        // dispatch(
        //   setLoggedIn({
        //     isLoggedIn: true,
        //     token: res.data.token,
        //   })
        // );
        login(res.data.user);
        localStorage.setItem("token", res.data.token);
        message.success("Login Successfully");
        navigate("/");
      }
    } catch (error) {
      // alert(error);
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
            onSubmit={handlLogin}
          >
            <h3 className="mb-4">Login</h3>
            <div className="mb-4">
              <input
                type="email"
                placeholder="Enter email"
                className="form-control"
                value={email}
                onChange={(e) => Setemail(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <input
                type="password"
                placeholder="Enter Password"
                className="form-control"
                value={password}
                onChange={(e) => Setpassword(e.target.value)}
                required
              />
            </div>
            <div className="d-grid mb-3">
              <button type="submit" className="btn btn-primary">
                Login
              </button>
            </div>
            <p className="text-right">
              Don't have an Account ? <a href="/register">Register</a>
            </p>
          </form>
        </div>
      </div>

      <Footer dark={isDarkTheme} />
    </div>
  );
};

export default Login;
