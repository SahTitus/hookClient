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
import { Camera, ChevronDown } from "react-bootstrap-icons";
import {
  addComment,
  fetchComments,
  addMorecomments,
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

  const { darkMode, focus, replyingTo } = useStateContex();
  const { post, isLoading } = useSelector((state) => state.posts);
  const { comments, commentsId } = useSelector((state) => state.comments);
  const sortComments = comments
    .slice()
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  const disable = !comment.trim() || !comment.length > 0;

  const commentsRef = useRef();
  console.log(replyingTo);

  useEffect(() => {
    if (!user) navigate("/auth");
    dispatch(fetchPost(id));
    dispatch(fetchComments(id));
  }, [id]);

  const handleChange = (e) => {
    setComment(e.target.value);
  };

  const commentData = {
    comment,
    image: "",
    creatorName: user?.result?.displayName || user?.result?.name,
    userDp: user?.result?.photoURL,
  };

  const replyData = {
    reply,
    replyingTo,
  };

  const handleSubmit = async (e, value) => {
    e.preventDefault();
    if (value === "comment") {
      commentsRef.current?.scrollIntoView({ behavior: "smooth" });
      dispatch(commentPst(id));
      if (commentsId) {
        dispatch(addMorecomments(commentsId, { commentData, postId: id }));
      } else {
        dispatch(addComment({ commentData, postId: id }));
      }

      setComment("");
    } else {
      // dispatch(addReply(commentsId, {replyData }))
      setReply('')
    }
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
              comment={comment.comment}
              timestamp={comment.createdAt}
              image={comment.image}
              userDp={comment.userDp}
              creatorName={comment.creatorName}
            />
          ))}
        </div>
      </div>

      <div className={`${style.comment__footer} ${focused && style.focused}`}>
        {replyingTo.length && (
        <div className={style.replying}>
          <p>
            Replying to <span>{replyingTo}</span>
          </p>
        </div>
         )} 
        <div className={`${style.comment__form}`}>
          <Avatar
            src={user?.result?.photoURL}
            className={style.comment__formAvatar}
          />
          <form onSubmit={handleSubmit}>
            {!replyingTo ? (
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
            ) : (
              <TextareaAutosize
                className={style.comment__textarea}
                placeholder="Leave your reply here..."
                value={reply}
                maxRows={14}
                type="text"
                autoFocus={true}
                onChange={(e) => setReply(e.target.value)}
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
            <button
              onClick={handleSubmit}
              disabled={disable}
              type="button"
              className={`${style.button} ${disable && style.buttonDisable}`}
            >
              Reply
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default PostDetails;
