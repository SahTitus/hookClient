import { Avatar } from "@mui/material";
import React, { useState } from "react";
import { useStateContex } from "../../store/StateProvider";
import style from "./CommentCard.module.css";

function CommentCard({ comment, image, creatorName, createdAt, userDp}) {
  const { darkMode } = useStateContex();
  const user = JSON.parse(localStorage.getItem("profile"))
  // const [comments, setComments] = useState([post?.comments])

  return (
    <div
      className={`${style.commentCard} ${darkMode && style.commentCardDark}`}
    >
      <div className={style.commentCardMain}>
        <div className={style.commentCardMainLeft}>
          {" "}
          <Avatar src={userDp } className={style.avatar} />
          <hr className={style.thread} />
        </div>

        <div className={style.commentCardRight}>
          <div className={style.commentCardBox}>
            <div className={style.commentCardBoxTop}>
              <p>{creatorName}</p>
              <span>1 d</span>
            </div>
            <p className={style.commentCardBoxText}>
             {comment} 
            </p>
          </div>

          <div className={style.commentCardBtm}>
            <div className={style.commentCardBtmLeft}>
              <p className={style.commentCardBtmLeftLike}>Like</p>
              <p>Reply</p>
            </div>
            <p className={style.commentCardBtmRight}>1 💖</p>
          </div>
        </div>
      </div>

      {/* SUB-COMMENTS */}
      {/* {<div> <CommentCard /></div>} */}

    </div>
  );
}

export default CommentCard;