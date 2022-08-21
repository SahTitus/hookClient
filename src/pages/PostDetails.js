import { ArrowBack } from "@mui/icons-material";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchPost } from "../actions/posts";
import PostCard from "../components/Post/PostCard";
import style from "../styles/PostDetails.module.css";
import { Avatar, TextareaAutosize } from "@mui/material";
import { useStateContex } from "../store/StateProvider";
import Spinner from "../components/loadash/Spinner";
import CommentCard from "../components/comment/CommentCard";
import { Camera, ChevronDown, Globe } from "react-bootstrap-icons";
import {
  addComment,
  fetchComments,
  addMorecomments,
  addReply,
} from "../actions/comments";
import { commentPst } from "../actions/posts";

function PostDetails() {
  const [comment, setComment] = useState("");
  const [reply, setReply] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const user = JSON.parse(localStorage.getItem("profile"));
  const [focused, setFocused] = useState(false);

  const { darkMode, focus, replyingTo, setReplyingTo } = useStateContex();
  const { post, isLoading } = useSelector((state) => state.posts);
  const { comments, commentsId } = useSelector((state) => state.comments);
  const [commentId, setCommentId] = useState("");

  const sortComments = comments
    .slice()
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  const disable =
    !comment.trim() &&
    !comment.length > 0 &&
    !reply.trim() &&
    !reply.length > 0;

  const commentsRef = useRef();

  useEffect(() => {
    if (!user) navigate("/auth");
    dispatch(fetchPost(id));
    dispatch(fetchComments(id));
  }, [id]);

  const handleChange = (e) => {
    if (isReply) {
      setReply(e.target.value);
    } else {
      setComment(e.target.value);
    }
  };

  const commentData = {
    comment,
    image: "",
    creatorName: user?.result?.displayName || user?.result?.name,
    userDp: user?.result?.photoURL,
    replies: [],
  };

  console.log(commentId);
  const replyData = {
    creatorName: user?.result?.displayName || user?.result?.name,
    userDp: user?.result?.photoURL,
    reply: reply,
    replyingTo,
    commentId: commentId,
  };

  const [isReply, setIsReply] = useState(false);

  const cancelReply = () => {
    setIsReply(false);
    setReplyingTo("");
  };

  const handleSubmit = async (e) => {
    console.log("first");
    e.preventDefault();
    // if (!isReply) {
    commentsRef.current?.scrollIntoView({ behavior: "smooth" });
    dispatch(commentPst(id));
    if (commentsId) {
      dispatch(addMorecomments(commentsId, { commentData, postId: id }));
    } else {
      dispatch(addComment({ commentData, postId: id }));
    }
    // }

    setComment("");
  };

  const handleReply = () => {
    console.log("Gone");
    dispatch(addReply(commentsId, replyData));

    setReply("");
  };

  if (isLoading)
    return (
      <div className={style.isLoading}>
        <Spinner />
      </div>
    );

  return (
    <div
      className={`${style.postDetails} ${darkMode && style.postDetailsDark}`}
    >
      <div className={style.postDetails__top}>
        <ArrowBack onClick={() => navigate(-1)} className={style.arrowBack} />
        <h4>{post.username}</h4>
      </div>

      <div className={style.postDetails__body}>
        <PostCard
          key={post._id}
          id={post._id}
          image={post?.imageData}
          link={post.link}
          text={post?.text}
          creatorName={post.username}
          userId={post.userId}
          likes={post.likes}
          group="Tanhans"
          timestamp={post.createdAt}
          comments={post.comments}
          noOfShares={0}
          description={post.description}
          reposted={post.repost}
          linkData={post?.linkData}
        />
        <div ref={commentsRef} />
        <div className={style.comments}>
          <div className={style.comments__top}>
            <p className={style.comments__topLeft}>Comments</p>
            <p className={style.comments__topRight}>
              Most relevant{" "}
              <span>
                <ChevronDown />{" "}
              </span>{" "}
            </p>
          </div>

          {sortComments?.map((comment, i) => (
            <CommentCard
              key={i}
              id={comment.id}
              comment={comment.comment}
              timestamp={comment.createdAt}
              image={comment.image}
              userDp={comment.userDp}
              creatorName={comment.creatorName}
              setIsReply={setIsReply}
              setCommentId={setCommentId}
              replies={comment.replies}
            />
          ))}
        </div>
      </div>

      <div className={`${style.comment__footer} ${focused && style.focused}`}>
        {replyingTo && isReply && (
          <div className={style.replying}>
            <p>
              Replying to <span>{replyingTo}</span>
            </p>
            <Globe />
            <p onClick={cancelReply}>Cancel</p>
          </div>
        )}
        <div className={`${style.comment__form}`}>
          <Avatar
            src={user?.result?.photoURL}
            className={style.comment__formAvatar}
          />
          <form onSubmit={handleSubmit}>
            {!replyingTo && !isReply && (
              <TextareaAutosize
                className={style.comment__textarea}
                placeholder="Leave a comment here..."
                value={comment}
                maxRows={14}
                type="text"
                autoFocus={focus}
                onChange={handleChange}
                onFocus={(e) => setFocused(true)}
                onBlur={(e) => setFocused(false)}
                multiline="multiline"
              />
            )}
            {replyingTo && isReply && (
              <TextareaAutosize
                className={style.comment__textarea}
                placeholder="Leave your reply here..."
                value={reply}
                maxRows={14}
                type="text"
                autoFocus={isReply}
                onChange={handleChange}
                onFocus={(e) => setFocused(true)}
                onBlur={(e) => setFocused(false)}
                multiline="multiline"
              />
            )}
          </form>
        </div>

        {(focused || !!comment.length > 0) && (
          <div className={`${style.footerBotm} `}>
            <div className={style.footerBotmLeft}>
              <Camera className={style.footerCamera} />
            </div>
            {/* {replyingTo && isReply && ( */}
            <button
              onClick={handleReply}
              // disabled={disable}
              type="button"
              className={`${style.button} ${disable && style.buttonDisable}`}
            >
              Reply
            </button>
            {/* )} */}
            {!replyingTo && !isReply && (
              <button
                onClick={handleSubmit}
                // disabled={disable}
                type="button"
                className={`${style.button} ${disable && style.buttonDisable}`}
              >
                Comment
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default PostDetails;
