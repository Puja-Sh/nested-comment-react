/* eslint-disable no-restricted-globals */
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "../style/comment.css";

import CommentCard from "./CommentCard";
import NewComment from "./NewComment";

const Comments = (props) => {
  const [like, setLike] = useState(false);
  const [comment, setComment] = useState([
    {
      id: "01",
      userName: "Sharma",
      comment: "Hi guyz! how are you??",
      like: 2,
      date: "12-Oct-2021",
      time: "1",
      displayTime: "8:16:21",
      reply: [],
      delete: false,
      editable: false,
    },
    {
      id: "02",
      userName: "Damon Salvatore",
      comment: "Hello Brother!!",
      like: 10,
      date: "12-Oct-2021",
      time: "2",
      displayTime: "8:16:50",
      reply: [],
      delete: false,
      editable: false,
    },
    {
      id: "03",
      userName: "Stefan salvy",
      comment: "Hi guyz! how are you??",
      like: 3,
      date: "12-Oct-2021",
      time: "3",
      displayTime: "8:16:31",
      reply: [
        {
          id: "100",
          userName: "Replying message",
          comment: "This is a reply message here",
          like: 3,
          date: "12-Oct-1999",
          time: "3",
          displayTime: "8:16:31",
          reply: [],
          delete: false,
          editable: false,
        },
        {
          id: "120",
          userName: "Replying message Another",
          comment: "This is a reply message here",
          like: 3,
          date: "12-Oct-1999",
          time: "3",
          displayTime: "8:16:31",
          reply: [],
          delete: false,
          editable: false,
        },
      ],
      delete: false,
      editable: false,
    },
  ]);

  // Adding new comment handling and sorting
  comment.sort((a, b) => (a.time < b.time ? 1 : -1));
  const addNewComment = (name, commentMessage) => {
    const newComment = [
      ...comment,
      {
        id: uuidv4().slice("-", 5),
        userName: name,
        comment: commentMessage,
        like: 0,
        time: new Date().getTime(),
        date: new Date().toLocaleDateString(),
        displayTime: new Date().toLocaleTimeString(),
        reply: [{}],
        delete: true,
        editable: true,
      },
    ];
    setComment(newComment);
  };

  // Like handler
  const likeHandler = (index) => {
    console.log(index);
    const newLike = [...comment];
    let likes = newLike[index].like;
    if (like === false && likes >= 0) {
      newLike[index].like = likes + 1;
      setComment(newLike);
      setLike(true);
    } else if (likes >= 1 && like) {
      newLike[index].like = likes - 1;
      setComment(newLike);
      setLike(false);
    }
  };

  // delete Handling
  const deleteComment = (index) => {
    const UpdatedComment = [...comment];
    let deleteConfirmation = confirm(
      "Are you sure you want to delete your comment?"
    );
    if (deleteConfirmation) {
      UpdatedComment.splice(index, 1);
      setComment(UpdatedComment);
    } else {
      return;
    }
  };

  return (
    <div>
      <NewComment addNewComment={addNewComment} />
      <CommentCard
        commentProp={comment}
        likeHandler={likeHandler}
        deleteComment={deleteComment}
      />
    </div>
  );
};

export default Comments;
