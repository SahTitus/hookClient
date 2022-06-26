// import { ThumbDown } from "@material-ui/icons";
import {
  AutorenewOutlined,
  ChatBubbleOutlineOutlined,
  Circle,
  IosShareOutlined,
  MoreHoriz,
  Public,
  ThumbUpOutlined,
  ThumbUpRounded,
} from "@mui/icons-material";
import { Avatar, Box, ClickAwayListener, Drawer } from "@mui/material";
import React, { useCallback, useState } from "react";
import style from "../../styles/PostCard.module.css";
import Reactions from "../Reactions";
import useToggle from "../../utils/useToggle";
import PostCardMenu from "./PostCardMenu";
import { useStateContex } from "../../store/StateProvider";
import { createPost } from "../../actions/posts";
import { useDispatch } from "react-redux"
import { parseISO, formatDistanceToNowStrict } from 'date-fns'

function PostCard({
  id,
  username,
  description,
  link,
  text,
  noOfShares,
  noOfComments,
  group,
  likes,
  dislikes,
  image,
  onto,
  timestamp,
  question,
  reposted
}) {
  const [liked, setLiked] = useState(false);
  // showReactions
  const { value, toggleValue } = useToggle(false);
  const [reactions, setReactions] = useState([]);
  const dispatch = useDispatch();

  const toggleShowReactions = () => {
    toggleValue();
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
    text ,
    description,
    // hallName,
    question,
    // pollQuestion,
    // pollOptions: pollOption.value,
    link,
    image,
    repost: true
  };

  const time = formatDistanceToNowStrict(parseISO(timestamp)) 

const handleSubmit = async (e) => {
  // e.preventDefault();
  dispatch(createPost(postData));
  console.log('Reposted')
};

const canonical = document.querySelector("link[rel=canonical]");
let url = canonical ? canonical.href : document.location.href;
const shareDetails = { url, text, description};

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
      <PostCardMenu id={id}/>
    </Box>
  );

  return (
    <div className={`${style.postCard} ${darkMode && style.postCardDark} ${reposted && style.repostMargin}`}>
      {reposted && 
      <div className={style.repostedCard}>
      <AutorenewOutlined className={style.repostedCardIcon} />
      <p>{username} </p>
      reposted
      </div>
}
      <div className={style.top}>
        <div className={style.topLeft}>
          <Avatar className={style.avatar} />
          <div className={style.info}>
            <p className={style.username}>Brinton Lee</p>
            <span>
            {time}<Circle className={style.dot} />{" "}
              <Public className={style.globe} />{" "}
            </span>
          </div>
        </div>
        <MoreHoriz
          onClick={toggleMenu("bottom", true)}
          className={`${style.topHoriz} ${darkMode && style.topHorizDark}`}
        />
      </div>

      <div className={style.middle}>
        {description ? (
          <div className={style.description}>{description}</div>
        ) : null}
        <div className={`${style.content} ${!image && style.contentText}`}>
          {image && <img src={image} alt="" />}
          {text && <p>{text}</p>}
        </div>
      </div>

      <div className={style.bottom}>
        {value && (
          <ClickAwayListener onClickAway={(event) => toggleValue()}>
            <p>
              {" "}
              <Reactions selectReaction={selectReaction} />
            </p>
          </ClickAwayListener>
        )}
        <div className={style.bottomCounts}>
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
            <span >10 reposts</span>
            <span>7 shares</span>
          </p>
        </div>
        <div className={style.bottomOptions}>
          {!liked ? (
            <ThumbUpOutlined
              onClick={toggleShowReactions}
              className={`${style.bottomIcons} ${
                darkMode && style.bottomIconsDark
              }`}
            />
          ) : (
            <ThumbUpRounded
              onClick={() => setLiked(!liked)}
              className={style.likeFill}
            />
          )}
          <ChatBubbleOutlineOutlined
            className={`${style.bottomIcons} ${
              darkMode && style.bottomIconsDark
            }`}
          />
          <AutorenewOutlined
          onClick={handleSubmit}
            className={`${style.bottomIcons} ${
              darkMode && style.bottomIconsDark
            }`}
          />
          <IosShareOutlined
          onClick={handleSharing}
            className={`${style.bottomIcons} ${
              darkMode && style.bottomIconsDark
            }`}
          />
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
  );
}

export default PostCard;
