import { Avatar } from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { likeComment } from "../../actions/comments";
import { useStateContex } from "../../store/StateProvider";
import style from "./CommentCard.module.css";
import ReplyCard from "./ReplyCard";

function CommentCard({
  comment,
  commentsId,
  commentLikes,
  replies,
  setIsReply,
  setCommentId,
  id,
  image,
  creatorName,
  createdAt,
  userDp,
}) {
  const [comLikes, setComLikes] = useState(commentLikes);

  const dispatch = useDispatch();
  const { darkMode, setReplyingTo, setFocus } = useStateContex();
  const user = JSON.parse(localStorage.getItem("profile"));

  const handleReply = () => {
    setReplyingTo(creatorName);
    setFocus(true);
    setIsReply(true);
    setCommentId(id);
  };

  const userId = user?.result?.uid || user?.result?._id;
  const hasLiked = commentLikes?.find((like) => like === userId);

  const handleLikes = async () => {
    dispatch(likeComment(commentsId, { commentId: id }));
    if (hasLiked) {
      setComLikes(commentLikes.filter((id) => id !== userId));
    } else {
      setComLikes([...commentLikes, userId]);
    }
  };

  return (
    <div
      className={`${style.commentCard} ${darkMode && style.commentCardDark}`}
    >
      <div className={style.commentCardMainLeft}>
        {" "}
        <Avatar src={userDp} className={style.avatar} />
        {!!replies.length && <hr className={style.thread} />}
      </div>
      <div className={style.commentCardMain} id="fist">
        <div className={style.commentCardRight}>
          <div className={style.commentCardBox}>
            <div className={style.commentCardBoxTop}>
              <p>{creatorName}</p>
              <span>1 d</span>
            </div>
            <p className={style.commentCardBoxText}>{comment}</p>
          </div>

          <div className={style.commentCardBtm} dataset="fist">
            <div className={style.commentCardBtmLeft}>
              <p className={style.commentCardBtmLeftLike} onClick={handleLikes}>
                Like
              </p>
              <p onClick={handleReply}>Reply</p>
            </div>
            {comLikes?.length > 0 && (
              <p className={style.commentCardBtmRight}>{comLikes?.length} 💖</p>
            )}
          </div>
        </div>

        <div>
          {replies?.map((reply) => (
            <ReplyCard
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
          ))}
        </div>
      </div>
    </div>
  );
}

export default CommentCard;
