// import { ThumbDown } from "@material-ui/icons";
import {
  AutorenewOutlined,
  Circle,
  MoreHoriz,
  Public,
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  ClickAwayListener,
  Drawer,
  IconButton,
} from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import style from "../../styles/PostCard.module.css";
import Reactions from "../Reactions";
// import useToggle from "../../utils/useToggle"; 
import PostCardMenu from "./PostCardMenu";
import { useStateContex } from "../../store/StateProvider";
import { createPost, likePost } from "../../actions/posts";
import { useDispatch } from "react-redux";
import { parseISO, formatDistanceToNowStrict } from "date-fns";
import {
  Chat,
  BoxArrowUp,
  ArrowRepeat,
  Heart,
  HeartFill,
  Link45deg,
} from "react-bootstrap-icons";
import ProgressiveImg from "../ProgressiveImg";
import { Link, useNavigate } from "react-router-dom";
import useLongPress from "../../utils/useLongPress";

function PostCard({
  id,
  creatorName,
  userId,
  creatorImage,
  description,
  link,
  text,
  noOfShares,
  noOfComments,
  hallName,
  linkData,
  likes,
  image,
  timestamp,
  question,
  reposted,
}) {
  const [liked, setLiked] = useState(false);
  // showReactions
  const [ showReactions, setShowReactions ] = useState(false);
  const [reactions, setReactions] = useState([]);
  const dispatch = useDispatch();
  // const [showIcon, setIconShow] = useState(true);
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);
  const user = JSON.parse(localStorage.getItem("profile"))
  const hideReadmore = window.location.href.includes(`${id}`);

  const onLongPress = () => {
    console.log("longpress is triggered");
    setShowReactions(true);
  };

  const onClick = () => {
    console.log("click is triggered");
    dispatch(likePost(id))
  };

  const defaultOptions = {
    shouldPreventDefault: true,
    delay: 500,
  };
  const longPressEvent = useLongPress(onLongPress, onClick, defaultOptions);

  const handleClick = (e) => {
    if (!hideReadmore) setOpen(!open);
    // setIconShow(false)
  };

  // if (!hideReadmore) setOpen(true);

  useEffect(() => {
    setOpen(false);
    if (hideReadmore) setOpen(true);
  }, []);

  const toggleShowReactions = () => {

    setLiked(!liked);
  };

  const selectReaction = (reaction) => {
    toggleReactionsCallback(reaction);
    toggleShowReactions();
  };

  //StateContext
  const { darkMode } = useStateContex();

  // Put this callback function in redux
  const toggleReactionsCallback = useCallback(
    (reaction) => {
      const includesReactions = !!reactions.find(
        (item) => item.id === reaction.id
      );
      let newReactions = [];

      if (includesReactions) {
        // Remove Reaction
        newReactions = reactions;
      } else {
        // Add Reaction
        newReactions = reactions.concat(reaction);
      }

      setReactions(newReactions);
    },
    [reactions]
  );

  const [state, setState] = useState({
    bottom: false,
  });

  const toggleMenu = (anchor, open) => (event) => {
    setState({ ...state, [anchor]: open });
  };

  const postData = {
    text,
    description,
    // hallName,
    question,
    // pollQuestion,
    // pollOptions: pollOption.value,
    link,
    image,
    repost: true,
  };

  const openPost = () => {
    navigate(`/postDetails/${id}`);
  };

 const Like = () => {
  
if (likes.length > 0)  { return likes.find((like )=> like === (user?.result?.uid || user?.result?._id)) ?
  (
    <>
    <Heart
      className={`${style.bottomIcons} ${style.bottomLikeIcon} ${
        darkMode && style.bottomIconsDark
      }`}
    />
    </>
  ) : (
    <>
    <HeartFill
      onClick={() => setLiked(!liked)}
      className={style.likeFill}
    />
    </>

  )
  }
return <>
<Heart
  className={`${style.bottomIcons} ${style.bottomLikeIcon} ${
    darkMode && style.bottomIconsDark
  }`}
/>
</>
  }
  
  const handleSubmit = async (e) => {
    // e.preventDefault();
    dispatch(
      createPost({
        ...postData,
        creatorName: user?.result?.displayName,
        userId: user?.result?.uid,
      })
    );
    console.log("Reposted");
  };

  const url = `${window.location.origin}/postDetails/${id}`;
  const shareDetails = { url, text, description };

  const handleSharing = async () => {
    if (navigator.share) {
      try {
        await navigator
          .share(shareDetails)
          .then(() =>
            console.log("Hooray! Your content was shared to tha world")
          );
      } catch (error) {
        console.log(`Oops! I couldn't share to the world because: ${error}`);
      }
    } else {
      // fallback code
      console.log(
        "Web share is currently not supported on this browser. Please provide a callback"
      );
    }
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleMenu(anchor, false)}
      onKeyDown={toggleMenu(anchor, false)}
    >
      <PostCardMenu id={id} />
    </Box>
  );

  return (
    // <Link to='/chats'>
    <div
      className={`${style.postCard} ${darkMode && style.postCardDark} ${
        reposted && style.repostMargin
      }`}
    >
      {reposted && (
        <div className={style.repostedCard}>
          <AutorenewOutlined className={style.repostedCardIcon} />
          <p>{creatorName} </p>
          reposted
        </div>
      )}
      {hallName && (
        <div className={style.hallName}>
          <Chat />
          <p>Web development</p>
        </div>
      )}
      <div onClick={openPost} className={style.top}>
        <div className={style.topLeft}>
          <Link to="/profile" >
            <Avatar src={user?.result?.photoURL} className={style.avatar} />
          </Link>

          <div className={style.info}>
            {/* <Link to="/profile"> */}
            <p className={style.creatorName}>{creatorName}</p>
            {/* </Link> */}
            <span>
              {timestamp && formatDistanceToNowStrict(parseISO(timestamp))}
              <Circle className={style.dot} />{" "}
              <Public className={style.globe} />{" "}
              {!!reactions.length && (
                <>
                  <Circle className={style.dot} />{" "}
                  {reactions.slice(0, 5).map((reaction, i) => (
                    <span key={i} className={style.reaction}>{reaction.label}</span>
                  ))}
                </>
              )}
            </span>
          </div>
        </div>
        <IconButton onClick={toggleMenu("bottom", true)}>
          <MoreHoriz
            className={`${style.topHoriz} ${darkMode && style.topHorizDark}`}
          />
        </IconButton>
      </div>

      <div className={style.middle}>
        {description ? (
          <div
            onClick={handleClick}
            className={`${style.description} ${open && style.show}`}
          >
            <p className={`${style.descText} ${open && style.show}`}>
              {description}
            </p>

            {!hideReadmore && (
              <> {open ? null : <p className={style.readMore}>Read more</p>} </>
            )}
          </div>
        ) : null}
        <div
          className={`${style.content} ${
            !image?.image_url && style.contentText
          }`}
        >
          {/* {image && <img src={image} alt="" />} */}
          {image?.image_url && (
            <ProgressiveImg
              src={image?.image_url}
              placeholderSrc={image?.image_placeholder}
              // width="700"
              // height="465"
            />
          )}
          {text && <p>{text}</p>}

          {link && (
            <div className={`${style.linkCard}`}>
              {linkData?.linkImage ? (
                <img src={linkData?.linkImage} alt="" />
              ) : (
                <Link45deg className={style.linkCard__imgPlaceholder} />
              )}

              <div className={style.linkCard__info}>
                <div
                  className={`${style.linkCard__descMid} ${
                    !linkData?.linkDesc && style.linkCard__descMidMargin
                  }`}
                >
                  {linkData?.linkDesc && (
                    <p className={style.linkCard__desc}>{linkData?.linkDesc}</p>
                  )}
                </div>

                <div className={style.linkCard__bottom}>
                  <p className={style.linkCard__bottomLeft}>
                    <Link45deg className={style.linkCard__bottomLeftIcon} />
                    <a target="_self" href={link}>
                      {linkData?.siteName || link}
                    </a>
                  </p>
                  <span className={style.linkCard__bottomView}>Visit link</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className={style.bottom}>
        {showReactions && (
          <ClickAwayListener onClickAway={(event) => setShowReactions(false)}>
            <div onClick={() => setShowReactions(false)}>
              {" "}
              <Reactions selectReaction={selectReaction} />
            </div>
          </ClickAwayListener>
        )}
        {/* <div className={style.bottomCounts}>
          <div
            className={`${style.likes} ${darkMode && style.rightCountsDark}`}
          >
            {reactions.slice(0, 3).map((reaction) => (
              <span>{reaction.label}</span>
            ))}
            <p>1.2k</p>
          </div>
          <p
            className={`${style.rightCounts} ${
              darkMode && style.rightCountsDark
            }`}
          >
            <span>48 comments</span>
            <span>10 reposts</span>
            <span>7 shares</span>
          </p>
        </div> */}
        <div className={style.bottomOptions}>
          <div   onClick={() => dispatch(likePost(id))} className={style.bottomOption} {...longPressEvent} onMouseEnter={(e) => setShowReactions(true)} onClick={toggleShowReactions}>
            {/* {!liked ? } */}
            <Like />
           <p> {likes.length}</p>
          </div>
          <div className={style.bottomOption}>
            <Chat
              className={`${style.bottomIcons} ${
                darkMode && style.bottomIconsDark
              }`}
            />
            <p>11</p>
          </div>
          <div className={style.bottomOption} onClick={handleSubmit}>
            <ArrowRepeat
              className={`${style.bottomIcons} ${
                darkMode && style.bottomIconsDark
              }`}
            />
            <p>4</p>
          </div>
          <div className={style.bottomOption} onClick={handleSharing}>
            <BoxArrowUp
              className={`${style.bottomIcons} ${
                darkMode && style.bottomIconsDark
              }`}
            />
            <p>8</p>
          </div>
        </div>
      </div>

      <Drawer
        anchor="bottom"
        open={state.bottom}
        onClose={toggleMenu("bottom", false)}
        onOpen={toggleMenu("bottom", true)}
      >
        {list("bottom")}
      </Drawer>
    </div>
    // </Link>
  );
}

export default PostCard;
