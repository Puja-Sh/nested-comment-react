import React, { useState } from "react";
import { FaUserCircle } from "react-icons/fa";

import "../style/header.css";

function NewComment({ addNewComment }) {
  const [input, setInput] = useState({
    name: "",
    comment: "",
  });

  const submitHandler = (e) => {
    e.preventDefault();
    if (!input) return;
    const newName = input.name;
    const newComment = input.comment;
    addNewComment(newName, newComment);
    setInput({
      name: "",
      comment: "",
    });
  };

  const changeHandler = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="header-container">
      {/* <FaUserCircle /> */}
      <form onSubmit={submitHandler} className="form">
        <label>
          Name:
          <input
            type="text"
            onChange={changeHandler}
            value={input.name}
            name="name"
            placeholder="your name?"
          />
        </label>
        <label>
          Comment:
          <textarea
            name="comment"
            value={input.comment}
            onChange={changeHandler}
          />
        </label>
        <button className="submit-btn">Submit</button>
      </form>
    </div>
  );
}

export default NewComment;
