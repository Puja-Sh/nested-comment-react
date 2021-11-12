/* eslint-disable no-restricted-globals */
import React, { useCallback, useMemo, useState, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import "../style/comment.css";

import CommentCard from "./CommentCard";
import NewComment from "./NewComment";

const Comments = (props) => {
  const commentsList = useRef([
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
  ].sort((a, b) => (a.time < b.time ? 1 : -1)))

  // rootComment are which has parentId == NULL
  const rootComments = useMemo(() => (
    commentsList.current.filter((comment) => !comment.parentId)
  ), [commentsList])

  const [reply, setReply] = useState("");
  const [id, setId] = useState(null);
  const likedCommentsIds = useRef([]) // State that holds comments that user liked

  ////////////
  // HANDLERS
  ////////////

  // Handle adding new commment
  const addNewComment = useCallback((name, commentMessage, userId) => {
    commentsList.current.push({
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
    })
  }, [])

  // Like handler
  const likeHandler = useCallback((id) => {
    if (likedCommentsIds.current.includes(id)) { // If user has previously liked the comment
      // Remove the comment id from liked comments ids
      likedCommentsIds.current.splice(likedCommentsIds.current.indexOf(id), 1)
      // Decrease like count
      commentsList.current.filter((comment) => (comment.id === id))[0].like -= 1
    } else { // If user has not liked the comment already
      // Add the comment id to liked comments ids
      likedCommentsIds.current.push(id)
      // Increase like count
      commentsList.current.filter((comment) => (comment.id === id))[0].like += 1
    }
  }, [likedCommentsIds])

  // Handles delete
  const deleteComment = useCallback((index) => {
    let deleteConfirmation = confirm(
      "Are you sure you want to delete your comment?"
    )
    if (deleteConfirmation) {
      commentsList.current = commentsList.current.filter((comment, i) => (
        i !== index ? comment : null
      ))
    }
  }, [])

  const userNameHandler = useCallback((name, id) => {
    let replyTo = commentsList.current.filter((comment) => comment.id === id);
    let userId = id;
    if (replyTo) {
      setReply(name);
      setId(userId);
    }
  }, [commentsList])

  // Function that gets replies to any comment
  const getReplies = useCallback((commentId) => {
    let result = commentsList.current.filter((comment) => comment.parentId === commentId);
    return result;
  }, [commentsList])

  return (
    <div>
      <NewComment
        addNewComment={addNewComment}
        userNameHandler={userNameHandler}
        replyName={reply}
        userId={id}
      />

      {rootComments.map((root, index) => (
        <CommentCard
          rootComment={root}
          likeHandler={likeHandler}
          deleteComment={deleteComment}
          replies={getReplies(root.id)}
          userNameHandler={userNameHandler}
          key={index}
        />
      ))}
    </div>
  );
};

export default Comments;
