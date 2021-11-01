import React, { useCallback, useState } from "react";

import { FaUserCircle, FaReply, FaRegHeart, FaEdit } from "react-icons/fa";
import { RiDeleteBinLine } from "react-icons/ri";

const CommentCard = ({
  replies,
  rootComment,
  likeHandler,
  deleteComment,
  userNameHandler,
}) => {
  const [activate, setActivate] = useState(false);

  const userHandler = (name, id) => {
    console.log(id);
    userNameHandler(name, id);
  };

  const likeButtonHandler = useCallback(
    (id) => {
      likeHandler(id);

      if (activate === false) {
        setActivate(true);
        console.log(activate);
      } else {
        setActivate(false);
      }
    },
    [likeHandler, activate]
  );
  return (
    <div className="comment-card">
      <ul>
        {/* {commentProp.map((commentDetail, i) => ( */}
        <li className="comment-card-li">
          <div>
            <div>
              <div className="inline">
                <div>
                  <FaUserCircle fontSize="5rem" color="grey" />
                </div>
                <div className="comment-detail">
                  <div className="comment-detail-header">
                    <button
                      className="user-name-btn"
                      onClick={() => {
                        userHandler(rootComment.userName, rootComment.id);
                      }}
                    >
                      <span className="user-name">{rootComment.userName}</span>
                      <FaReply />
                    </button>
                    <span className="date-time hidden">{rootComment.id} </span>
                    <span className="date-time">{rootComment.date} </span>
                    <span className="date-time">{rootComment.displayTime}</span>
                    <span className="date-time hidden">
                      {rootComment.time}{" "}
                    </span>
                    {rootComment.editable ? (
                      <button>
                        <FaEdit />
                      </button>
                    ) : null}
                  </div>

                  <div className="comment-message">{rootComment.comment}</div>
                  <div>
                    {rootComment.delete ? (
                      <button onClick={deleteComment}>
                        <RiDeleteBinLine />
                      </button>
                    ) : null}
                    <button
                      onClick={() => {
                        likeButtonHandler(rootComment.id);
                      }}
                    >
                      <FaRegHeart color={activate ? "red" : null} />
                      <span> {rootComment.like} </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {replies.length > 0
            ? replies.map((reply) => (
                <div>
                  <CommentCard
                    rootComment={reply}
                    key={reply.id}
                    replies={[]}
                    likeHandler={likeHandler}
                    deleteComment={deleteComment}
                    userNameHandler={userNameHandler}
                  />
                </div>
              ))
            : null}
        </li>
        {/* ))} */}
      </ul>
    </div>
  );
};

export default CommentCard;
