import { ArrowBack, GifBoxOutlined } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
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

function PostDetails() {
  const [comment, setComment] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const user = JSON.parse(localStorage.getItem("profile"))?.data;
  const [focused, setFocused] = useState(false);

  const { darkMode } = useStateContex();
  const { post, isLoading, error } = useSelector((state) => state.posts);
  const disable = !comment.trim() || !comment.length > 0;

  useEffect(() => {
    if (!user) navigate("/auth");
    dispatch(fetchPost(id));
  }, [id]);

  const handleChange = (e) => {
    setComment(e.target.value);
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
          likes={0}
          dislikes={0}
          group="Tanhans"
          timestamp={post.createdAt}
          noOfComments={0}
          noOfShares={0}
          description={post.description}
          reposted={post.repost}
          linkData={post?.linkData}
        />
        <div className={style.comments}>
          <div className={style.comments__top}>
            <p  className={style.comments__topLeft}>Comments</p>
            <p className={style.comments__topRight}>
              Most relevant{" "}
              <span>
                <ChevronDown />{" "}
              </span>{" "}
            </p>
          </div>

          <CommentCard />
        </div>
      </div>

      <div className={`${style.comment__footer} ${focused && style.focused}`}>
        <div className={`${style.comment__form}`}>
          <Avatar
            src={user?.result?.photoURL}
            className={style.comment__formAvatar}
          />
          <form>
            <TextareaAutosize
              className={style.comment__textarea}
              placeholder="Leave a comment here..."
              name={comment}
              type="text"
              onChange={handleChange}
              onFocus={(e) => setFocused(true)}
              onBlur={(e) => setFocused(false)}
              multiline="multiline"
            />
          </form>
        </div>

        {focused && (
          <div className={`${style.footerBotm} `}>
            <div className={style.footerBotmLeft}>
              <Camera className={style.footerCamera} />
              {/* <GifBoxOutlined /> */}
            </div>
            <button
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
