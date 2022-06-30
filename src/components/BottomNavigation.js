import { useState } from "react";
import "../styles/BottomNavigation.css";
import {
  Home,
  ChatBubbleOutline,
  HomeOutlined,
  ChatBubble,
  SupervisedUserCircleOutlined,
  QuestionMark,
  Search,
  SupervisedUserCircle,
} from "@mui/icons-material";
import { NavLink, useLocation } from "react-router-dom";
import { useStateContex } from "../store/StateProvider";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faCommentDots } from "@fortawesome/free-regular-svg-icons";
// import Ripple from "../utilities/ripple";

function BottomNavigation() {
  const [isHomeClicked, setIsHomeClicked] = useState(true);
  const [isChatClicked, setIsChatClicked] = useState(false);
  const [isHallsClicked, setIsHallsClicked] = useState(false);

  const { darkMode } = useStateContex()


  const toggleHomelClick = () => {
    setIsHomeClicked(true);
    setIsHallsClicked(false);
    setIsChatClicked(false);
  };
  const toggleChatClick = () => {
    setIsChatClicked(true);
    setIsHallsClicked(false);
    setIsHomeClicked(false);
  };
  const toggleHallsClick = () => {
    setIsChatClicked(false);
    setIsHallsClicked(true);
    setIsHomeClicked(false);
  };

  return (
    <div className={`btmNav ${darkMode  && 'btmNavDark'}`}>
      <div className="btmNav__container">
        <NavLink
          className={`btmNav__option ${darkMode && 'btmNav__optionDark'}`}
          style={({ isActive }) => {
            // setIsHomeClicked(isActive);
          }}
          to={"/"}
        >
          {!isHomeClicked ? (
            <HomeOutlined   className="navBtm__icon" />
          ) : (
            <Home onClick={toggleHomelClick} className="navBtm__icon" />
          )}

          <p>Home</p>
          {/* <Ripple className="rip" color={"#1fecf9"} duration={1500} /> */}
        </NavLink>
        <NavLink
          className={`btmNav__option ${darkMode && 'btmNav__optionDark'}`}
          style={({ isActive }) => {
          }}
          to={"/questions"}
        >
          <QuestionMark className="navBtm__icon" />
          <p>Questions</p>
          {/* <Ripple className="rip" color={"#1fecf9"} duration={1500} /> */}
        </NavLink>


        {/* <NavLink
          className={`btmNav__option ${darkMode && 'btmNav__optionDark'}`}
          style={({ isActive }) => {

          }}
          to={"/categories"}
        >
          {isHallsClicked ? (
            <SupervisedUserCircle className="navBtm__icon" />
          ) : (
            <SupervisedUserCircleOutlined onClick={toggleHallsClick} className="navBtm__icon" />
          )}
          <p>Halls</p>
     
        </NavLink> */}

        <NavLink
          className={`btmNav__option ${darkMode && 'btmNav__optionDark'}`}
          style={({ isActive }) => {
            // setIsChatClicked(isActive);
          }}
          to={"/chats"}
        >
          {/* <FontAwesomeIcon sx={{stroke: '#ffffff', strokeWidth: 1}} icon={faCommentDots} className="chatsIcon" /> */}
          {isChatClicked ? (
            <ChatBubble className="navBtm__icon" />
          ) : (
            <ChatBubbleOutline onClick={toggleChatClick} className="navBtm__icon" />
          )}
          <p>Chats</p>
          {/* <Ripple className="rip" color={"#1fecf9"} duration={1500} /> */}
        </NavLink>
        <NavLink
          className={`btmNav__option ${darkMode && 'btmNav__optionDark'}`}
          style={({ isActive }) => {
          }}
          to={"/search"}
        >
          <Search className="navBtm__icon" />
          <p>Search</p>
          {/* <Ripple className="rip" color={"#1fecf9"} duration={1500} /> */}
        </NavLink>
      </div>
    </div>
  );
}

export default BottomNavigation;
