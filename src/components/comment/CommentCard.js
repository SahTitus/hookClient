import { Avatar } from "@mui/material";
import React from "react";
import { useStateContex } from "../../store/StateProvider";
import style from "./CommentCard.module.css";

function CommentCard() {
  const { darkMode } = useStateContex();
  const user = JSON.parse(localStorage.getItem("profile"))

  return (
    <div
      className={`${style.commentCard} ${darkMode && style.commentCardDark}`}
    >
      <div className={style.commentCardMain}>
        <div className={style.commentCardMainLeft}>
          {" "}
          <Avatar src={user?.result?.photoURL} className={style.avatar} />
          <hr className={style.thread} />
        </div>

        <div className={style.commentCardRight}>
          <div className={style.commentCardBox}>
            <div className={style.commentCardBoxTop}>
              <p>Sah Titus</p>
              <span>1 d</span>
            </div>
            <p className={style.commentCardBoxText}>
              Ei! you lie jcgcttt 77f7  
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