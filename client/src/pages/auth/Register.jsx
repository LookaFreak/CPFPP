import React, { useEffect, useState } from "react";
import Navabar from "../../components/Navabar";
import Footer from "../../components/Footer";
import { message } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";





const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    Cpassword: "",
  })
  const [file, setFile] = useState(null)

  const [isDarkTheme, setIsDarkTheme] = useState(true);

  const enteringFormData = (event) => {
    let { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    })
  }
  const enteringFile = (event) => {
    setFile(event.target.files[0])
  }

  const handleRegister = async (event) => {
    event.preventDefault();
    try {
      let Payload = new FormData()
      Object.keys(formData).map((key) => {
        Payload.append(key, formData[key])
      })
      Payload.append("avatar", file)

      const res = await axios.post(
        "http://localhost:8000/api/v1/auth/register",
        Payload
      );
      if (res.data.success) {
        message.success("Regiter Successfully");
        navigate("/verifyemail/", { state: { email: formData.email } });
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
            <h3 className="mb-4">Register</h3>
            <div className="mb-4">
              <input
                type="name"
                placeholder="Full Name"
                className="form-control"
                value={formData?.name}
                name="name"
                onChange={enteringFormData}
              />
            </div>
            <div className="mb-4">
              <input
                type="email"
                placeholder="Email"
                className="form-control"
                value={formData.email}
                name="email"
                onChange={enteringFormData}
              />
            </div>
            <div className="mb-4">
              <input
                type="password"
                placeholder="Password"
                className="form-control"
                value={formData.password}
                name="password"
                onChange={enteringFormData}
              />
            </div>
            <div className="mb-4">
              <input
                type="password"
                placeholder="Confirm Password"
                className="form-control"
                value={formData.Cpassword}
                name="Cpassword"
                onChange={enteringFormData}
              />
            </div>
            <div className="mb-4">
              <input
                type="file"
                className="form-control"
                onChange={enteringFile}
              />
            </div>
            <div className="d-grid mb-3">
              <button type="submit" className="btn btn-primary">
                Register
              </button>
            </div>
            <p className="text-right">
              Already have an Account ? <a href="/login">login</a>
            </p>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Register;
