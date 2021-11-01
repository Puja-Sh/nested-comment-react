import React, { useState } from "react";

import "../style/header.css";

function NewComment({ addNewComment, userNameHandler, replyName, userId }) {
  const [input, setInput] = useState({
    name: "",
    comment: "",
    replyTo: "",
  });
  // console.log(replyName);

  const submitHandler = (e) => {
    e.preventDefault();
    if (!input) return;
    const newName = input.name;
    const newComment = input.comment;
    const replyTo = input.replyTo;
    addNewComment(newName, newComment, userId, replyTo);
    setInput({
      name: "",
      comment: "",
      replyTo: "",
    });
  };

  const changeHandler = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
      // [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="header-container">
      <form onSubmit={submitHandler} className="form">
        <label>
          Reply to
          <input
            type="search"
            onChange={changeHandler}
            value={replyName || input.replyTo}
            name="replyTo"
            placeholder="Reply to?"
          />
        </label>
        <label>
          Name:
          <input
            type="search"
            onChange={changeHandler}
            value={input.name}
            name="name"
            placeholder="your name?"
            required
          />
        </label>
        <label>
          Comment:
          <textarea
            name="comment"
            value={input.comment}
            onChange={changeHandler}
            maxLength="200"
            required
          />
        </label>
        <button className="submit-btn">Submit</button>
      </form>
    </div>
  );
}

export default NewComment;
