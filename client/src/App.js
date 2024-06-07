import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Error from "./pages/Error";
import "./App.css";
import "./dark.css";
import DetailBlog from "./pages/Blogs/DetailBlog";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import EditProfile from "./pages/auth/EditProtfile";
import VerifyEmail from "./pages/auth/VerifyEmail";
import { useSelector } from "react-redux";
import Spinner from "./components/Spinner";
import ProtectedRoute from "./components/ProtectRoute";
import Createblogs from "./pages/Blogs/Createblogs";
import Categories from "./pages/categories/Categories";
import Protfile from "./pages/auth/Protfile";
import UpdateBlog from "./pages/Blogs/UpdateBlog";
// import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  const { loading } = useSelector((state) => state.alert);
  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/verifyemail" element={<VerifyEmail />} />
          <Route path="/editprofile" element={<EditProfile />} />
          <Route path="/update-blog/:id" element={<UpdateBlog />} />
          <Route path="/blogs/detail/:id" element={<DetailBlog />} />
          <Route
            path="/create-blogs"
            element={
              <ProtectedRoute>
                <Createblogs />
              </ProtectedRoute>
            }
          />
          <Route path="/profile" element={<Protfile />} />
          <Route path="/categories/:category" element={<Categories />} />

          <Route path="*" element={<Error />} />
        </Routes>
      )}
    </>
  );
};

export default App;
