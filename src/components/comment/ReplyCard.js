import { Avatar } from "@mui/material";
import React, { useState } from "react";
import { useStateContex } from "../../store/StateProvider";
import style from "./CommentCard.module.css";

function ReplyCard({
  reply,
  replyingTo,
  setIsReply,
  setCommentId,
  id,
  image,
  creatorName,
  createdAt,
  userDp,
}) {
  const { darkMode, setReplyingTo, setFocus } = useStateContex();
  // const user = JSON.parse(localStorage.getItem("profile"))
  // const [comments, setComments] = useState([post?.comments])

  const handleReply = () => {
    setReplyingTo(creatorName);
    setFocus(true);
    setIsReply(true);
    setCommentId(id);
  };

  return (
    <div
      className={`${style.commentCard} ${darkMode && style.commentCardDark} ${
        !!reply.length && style.replyCard
      } `}
    >
      <div className={style.commentCardMainLeft}>
        {" "}
        <Avatar
          src={userDp}
          className={`${style.avatar} ${!!reply.length && style.replyAvatar}`}
        />
      </div>
      <div className={style.commentCardMain}>
        <div className={style.commentCardRight}>
          <div className={style.commentCardBox}>
            <div className={style.commentCardBoxTop}>
              <span>{creatorName ? creatorName : "Mr. Mensah"} </span>
              <span>1 d</span>
            </div>
            <div className={style.commentCardBoxText}>
              <p>
                {" "}
                <span className={style.replyingTo}>{replyingTo}</span> {reply}{" "}
              </p>
            </div>
          </div>

          <div className={style.commentCardBtm} dataset="fist">
            <div className={style.commentCardBtmLeft}>
              <p className={style.commentCardBtmLeftLike}>Like</p>
              <p onClick={handleReply}>Reply</p>
            </div>
            <p className={style.commentCardBtmRight}>1 💖</p>
          </div>
        </div>
      </div>

      {/* SUB-COMMENTS */}
      {/* {<div> <CommentCard /></div>} */}

      {/* {  replies?.map(reply => (
        <CommentCard 
        key={reply?.id}
              id={reply?.id}
              reply={reply?.reply}
              timestamp={reply?.createdAt}
              image={reply?.image}
              userDp={reply?.userDp}
              creatorName={reply?.creatorName}
              replies={reply?.reply}
              replyingTo={reply?.replyingTo}
        />
      ))} */}
    </div>
  );
}

export default ReplyCard;
