import React, { useEffect, useState } from "react";
import "..//App.css";
import { commnets } from "../data/data";
import user from "../assets/person.png";
import axios from "axios";
import { message } from "antd";

// create coment method
const Comments = ({ id, dark }) => {
  const [comment, setComment] = useState();
  const [Bcomment, setBcomment] = useState([]);

  // create a method for geting comments

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  // add comment
  const handleComment = async (event) => {
    event.preventDefault();
    try {
      const token = localStorage.getItem("token"); // Get the token from local storage

      console.log(token);
      const res = await axios.post(
        `http://localhost:8000/api/v1/comment/comments/${id}`,
        { comment },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Add the token to the Authorization header
          },
        }
      );
      if (res.data.success) {
        message.success("Comments added successfully");
      }
    } catch (error) {
      message.error("Something went wrong");
    }
  };

  const getComments = async () => {
    try {
      const token = localStorage.getItem("token"); // Get the token from local storage

      const comm = await axios.get(`/api/v1/comment/comments/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Add the token to the Authorization header
        },
      });

      if (comm.data.success) {
        setBcomment(comm.data.commentss);
      }
    } catch (error) {
      message.error("Something went wrong");
    }
  };

  useEffect(() => {
    if (id) {
      getComments();
    }
  }, [id]);
  return (
    <div className="comments">
      <h2
        style={{ fontWeight: "lighter", fontSize: "24px" }}
        className={` ${dark ? "text-dark" : "text-light"}`}
      >
        Comments
      </h2>
      <form onSubmit={handleComment}>
        <div className="form-group">
          <textarea
            className="form-control"
            id="comment"
            rows="3"
            style={{
              backgroundColor: dark ? "#ffffff" : "#333333",
              color: dark ? "#000000" : "#ffffff",
            }}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary mt-3">
          Comment
        </button>
      </form>
      {/* TODO add comments */}
      {Bcomment.map((comm) => (
        <div className={` ${dark ? "show-comments" : "dark-comments"} mt-3`}>
          <img
            src={comm.user.avatar}
            alt=""
            style={{ width: "3.5rem", height: "3.5rem", borderRadius: "50%" }}
          />
          <div className="comment-detail">
            <p>{comm.user.name}</p>
            <span>{formatDate(comm.commentDate)}</span>
            <p className="comment-text">{comm.comment}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Comments;
