/* eslint-disable no-restricted-globals */
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "../style/comment.css";

import CommentCard from "./CommentCard";
import NewComment from "./NewComment";

const Comments = (props) => {
  const [liking, setLiking] = useState(false);
  const [comment, setComment] = useState([
    {
      id: "01",
      parentId: null,
      userId: "01",
      userName: "Sharma",
      comment: "Hi guyz! how are you??",
      like: 2,
      date: "12-Oct-2021",
      time: "1",
      displayTime: "8:16:21",
      delete: false,
      editable: false,
    },
    {
      id: "02",
      parentId: null,
      userId: "02",
      userName: "Damon Salvatore",
      comment: "Hello Brother!!",
      like: 10,
      date: "12-Oct-2021",
      time: "2",
      displayTime: "8:16:50",
      delete: false,
      editable: false,
    },
    {
      id: "03",
      parentId: null,
      userId: "03",
      userName: "Stefan salvy",
      comment: "Hi guyz! how are you??",
      like: 3,
      date: "12-Oct-2021",
      time: "3",
      displayTime: "8:16:31",
      delete: false,
      editable: false,
    },
    {
      id: "04",
      parentId: "01",
      userId: "03",
      userName: "Replying message",
      comment: "This is a reply message here",
      like: 3,
      date: "12-Oct-1999",
      time: "4",
      displayTime: "8:16:31",
      delete: false,
      editable: false,
    },
    {
      id: "05",
      parentId: "03",
      userId: "02",
      userName: "Replying message Another",
      comment: "This is a reply message here",
      like: 3,
      date: "12-Oct-1999",
      time: "5",
      displayTime: "8:16:31",
      delete: false,
      editable: false,
    },
    {
      id: "06",
      parentId: "03",
      userId: "02",
      userName: "Replying message",
      comment: "This is a reply message here",
      like: 3,
      date: "12-Oct-1999",
      time: "6",
      displayTime: "8:16:31",
      delete: false,
      editable: false,
    },
    {
      id: "07",
      parentId: "02",
      userId: "02",
      userName: "Replying message",
      comment: "This is a reply message here",
      like: 3,
      date: "12-Oct-1999",
      time: "7",
      displayTime: "8:16:31",
      delete: false,
      editable: false,
    },
    {
      id: "07",
      parentId: "06",
      userId: "02",
      userName: "Replying message",
      comment: "This is a reply message here",
      like: 3,
      date: "12-Oct-1999",
      time: "7",
      displayTime: "8:16:31",
      delete: false,
      editable: false,
    },
  ]);

  // Adding new comment handling and sorting
  comment.sort((a, b) => (a.time < b.time ? 1 : -1));
  const addNewComment = (name, commentMessage, userId) => {
    const newComment = [
      ...comment,
      {
        id: uuidv4().slice("-", 5),
        parentId: userId,
        userName: name,
        comment: commentMessage,
        like: 0,
        time: new Date().getTime(),
        date: new Date().toLocaleDateString(),
        displayTime: new Date().toLocaleTimeString(),
        delete: true,
        editable: true,
      },
    ];
    setComment(newComment);
  };

  // Like handler
  const likeHandler = (id) => {
    let liked = comment.filter((comment) => comment.id === id);

    if (liking === false) {
      liked.map((like, index) => (liked[index].like = like.like + 1));

      const updatedLike = [...comment];
      setComment(updatedLike);
      setLiking(true);
    } else if (liking === true) {
      liked.map((unlike, index) => (liked[index].like = unlike.like - 1));

      const updateLike = [...comment];
      setComment(updateLike);
      setLiking(false);
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
  // rootComment are which has parentId == NULL
  const rootComment = comment.filter((comment) => comment.parentId === null);

  const getReplies = (commentId) => {
    let result = comment.filter((comment) => comment.parentId === commentId);
    return result;
  };
  const [reply, setReply] = useState("");
  const [id, setId] = useState(null);
  const userNameHandler = (name, id) => {
    let replyTo = comment.filter((comment) => comment.id === id);
    let userId = id;
    if (replyTo) {
      setReply(name);
      setId(userId);
    }
  };
  return (
    <div>
      <NewComment
        addNewComment={addNewComment}
        userNameHandler={userNameHandler}
        replyName={reply}
        userId={id}
      />

      {rootComment.map((root) => (
        <CommentCard
          key={root.id}
          rootComment={root}
          likeHandler={likeHandler}
          deleteComment={deleteComment}
          replies={getReplies(root.id)}
          userNameHandler={userNameHandler}
        />
      ))}
    </div>
  );
};

export default Comments;
