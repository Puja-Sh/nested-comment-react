import React, { useCallback } from "react";

import { FaUserCircle, FaReply, FaRegHeart, FaEdit } from "react-icons/fa";
import { RiDeleteBinLine } from "react-icons/ri";
import Reply from "./Reply";

const CommentCard = ({ commentProp, likeHandler, deleteComment }) => {
  const likeButtonHandler = useCallback(
    (index) => {
      likeHandler(index);
    },
    [likeHandler]
  );

  return (
    <div className="comment-card">
      <ul>
        {commentProp.map((commentDetail, i) => (
          <li key={commentDetail.id} className="comment-card-li">
            <div>
              <div>
                <div className="inline">
                  <div>
                    <FaUserCircle fontSize="5rem" color="grey" />
                  </div>
                  <div className="comment-detail">
                    <div className="comment-detail-header">
                      <span className="user-name">
                        {commentDetail.userName}
                      </span>
                      <span className="date-time">{commentDetail.date} </span>
                      <span className="date-time">
                        {commentDetail.displayTime}{" "}
                      </span>
                      <span className="date-time">{commentDetail.time} </span>
                      {commentDetail.editable ? (
                        <button>
                          <FaEdit />
                        </button>
                      ) : null}
                    </div>

                    <div className="comment-message">
                      {" "}
                      {commentDetail.comment}{" "}
                    </div>
                    <div>
                      <button>
                        <FaReply />
                      </button>
                      {commentDetail.delete ? (
                        <button onClick={deleteComment}>
                          <RiDeleteBinLine />
                        </button>
                      ) : null}
                      <button
                        onClick={() => {
                          likeButtonHandler(i);
                        }}
                      >
                        <FaRegHeart />
                        <span> {commentDetail.like} </span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {commentDetail.reply.length > 0 ? (
              <Reply
                reply={commentDetail.reply}
                likeHandler={likeHandler}
                deleteComment={deleteComment}
              />
            ) : null}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CommentCard;
