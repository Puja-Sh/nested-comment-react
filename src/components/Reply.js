import React, { useCallback } from "react";
import CommentCard from "./CommentCard";
import { FaUserCircle, FaReply, FaRegHeart, FaEdit } from "react-icons/fa";
import { RiDeleteBinLine } from "react-icons/ri";

import "../style/reply.css";

function Reply({ likeHandler, deleteComment, reply }) {
  reply.map((x, i) => console.log(i));
  const likeButtonHandler = useCallback(
    (index) => {
      likeHandler(index);
    },
    [likeHandler]
  );
  return (
    <div className="reply-card">
      <ul>
        {reply.map((commentDetail, i) => (
          <li key={commentDetail.id} className="reply-card-li">
            <div>
              <div>
                <div className="inline">
                  <div>
                    <FaUserCircle fontSize="3rem" color="grey" />
                  </div>
                  <div className="reply-detail">
                    <div className="reply-detail-header">
                      <span className="reply-user-name">
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

                    <div className="reply-message">{commentDetail.comment}</div>
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
    // <div>
    //   <CommentCard
    //     commentProp={reply}
    //     likeHandler={likeHandler}
    //     deleteComment={deleteComment}
    //   />
    // </div>
  );
}

export default Reply;
