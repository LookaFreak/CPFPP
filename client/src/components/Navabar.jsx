import React, { useEffect, useState } from "react";
import logo from "../assets/logo.png";
import { categories } from "../data/data";
import { useDispatch, useSelector } from "react-redux";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import { CiLight } from "react-icons/ci";
import { CiDark } from "react-icons/ci";
const Navabar = ({ dark, Setdark }) => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const navigate = useNavigate();
  const [data, Setdata] = useState(false);
  const [category, Setcategory] = useState("");

  const handleLogout = () => {
    localStorage.clear();
    message.success("Logout Successfully");
    navigate("/login");
    window.location.reload();
  };

  const toggleTheme = () => {
    Setdark(!dark);
  };

  const token = localStorage.getItem("token");

  return (
    <nav
      className={`navbar navbar-expand-xl  ${
        dark ? "bg-white" : "bg-dark"
      }   py-2 fixed-top shadow`}
      data-bs-theme={dark ? "" : "dark"}
    >
      <div className="container">
        {/* logo */}
        <a href="/" className="navbar-brand fs-4">
          <img
            width="200px"
            height="100px"
            className="d-inline-block align-top"
            src={logo}
            alt=""
          />
        </a>
        {/* toggle buttons */}
        <button
          className={`navbar-toggler `}
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarLight"
          aria-controls="navbarLight"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        {!token ? (
          <div className="collapse navbar-collapse " id="navbarLight">
            {/* search bar */}
            <form
              class="d-flex form-inline my-2 my-lg-1 search-bar"
              style={{ marginLeft: "20rem" }}
            >
              <input
                class="form-control mr-sm-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                value={category}
                onChange={(e) => Setcategory(e.target.value)}
              />
              <button
                className="btn btn-outline-primary my-2 my-sm-0"
                type="submit"
              >
                Search
              </button>
            </form>
            <ul className="navbar-nav ms-auto mb-2 mb-xl-0   p-2 text-center">
              <li className="nav-item dropdown  nav-list">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Categories
                </a>
                <ul className="dropdown-menu">
                  {categories.map((item) => (
                    <li className=" nav-list">
                      <a
                        className="dropdown-item"
                        href={`/categories/${item.name}`}
                      >
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </li>

              <li className="nav-item  nav-list">
                <a
                  href="./register"
                  className="nav-link active"
                  aria-current="page"
                >
                  Register
                </a>
              </li>
              <li className="nav-item  nav-list">
                <a
                  href="./login"
                  className="nav-link active"
                  aria-current="page"
                >
                  Login
                </a>
              </li>
              <li>
                {/* //Todo  */}
                <button
                  onClick={toggleTheme}
                  style={{
                    border: "none",
                    background: "transparent",
                    fontSize: "1.5rem",
                  }}
                >
                  {isDarkTheme ? <CiDark /> : <CiLight />}
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <div className="collapse navbar-collapse " id="navbarLight">
            {/* search bar */}
            <form
              className="d-flex form-inline my-2 my-lg-1 search-bar"
              style={{ marginLeft: "20rem" }}
            >
              <input
                className="form-control mr-sm-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                value={category}
                onChange={(e) => Setcategory(e.target.value)}
              />
              <button
                className="btn btn-outline-primary my-2 my-sm-0"
                type="submit"
              >
                Search
              </button>
            </form>
            <ul className="navbar-nav ms-auto mb-2 mb-xl-0  nav-list  p-2 text-center">
              <li className="nav-item dropdown  nav-list">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Categories
                </a>
                <ul className="dropdown-menu">
                  {categories.map((item) => (
                    <li className=" nav-list">
                      <a
                        className="dropdown-item"
                        href={`/categories/${item.name}`}
                      >
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </li>
              <li className="nav-item nav-list">
                <a
                  onClick={() => navigate("/profile")}
                  className="nav-link active"
                  aria-current="page"
                >
                  Profile
                </a>
              </li>
              <li className="nav-item  nav-list">
                <a
                  onClick={() => navigate("/create-blogs")}
                  className="nav-link active"
                  aria-current="page"
                >
                  Create Blogs
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link active"
                  aria-current="page"
                  onClick={handleLogout}
                >
                  Logout
                </a>
              </li>
              <li>
                {/* //Todo  */}
                <button
                  onClick={toggleTheme}
                  style={{
                    border: "none",
                    background: "transparent",
                    fontSize: "1.5rem",
                  }}
                >
                  {isDarkTheme ? <CiDark /> : <CiLight />}
                </button>
              </li>
            </ul>
          </div>
        )}

        {/* sidebar */}
      </div>
    </nav>
  );
};

export default Navabar;
