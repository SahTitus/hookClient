// import { faComment} from '@fortawesome/free-regular-svg-icons'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  Avatar,
  List,
  Box,
  ListItemText,
  ListItem,
  ListItemIcon,
  Drawer,
} from "@mui/material";
import {
  ContactSupportOutlined,
  Edit,
  ReportOutlined,
  ShareOutlined,
  VisibilityOutlined,
  Clear,
} from "@mui/icons-material";
import React, { useState } from "react";
import "../styles/QuestionCard.css";
import { useStateContex } from "../store/StateProvider";

function QuestionCard({
  noOfAnswer,
  answer,
  answersBox,
  noOfShare,
  noOfFollow,
  question,
  timestamp,
  image,
  groupName,
}) {
  const [state, setState] = useState({
    bottom: false,
  });

  const { darkMode } = useStateContex()

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {["Report", "Hide", "Share"].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {index === 0 ? <ReportOutlined /> : null}
              {index === 1 ? <Clear /> : null}
              {index === 2 ? <ShareOutlined /> : null}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div className={`questionCard ${darkMode && "questionCardDark"}`}>
      <div className="questionCard__top">
        <div className="questionCard__topLeft">
          <Avatar src={image} />
          <div className="questionCard__topLeftText">
            <p className="questionCard__topLeftTextGroupName">
              <span >Asked in</span>
              {groupName}
            </p>
            <span>{timestamp}</span>
          </div>
        </div>
        <ContactSupportOutlined
          onClick={toggleDrawer("bottom", true)}
          className="questionCard__rightIcon"
        />
      </div>

      <div className="questionCard__middle">
        <p className="questionCard__question">{question}</p>
      </div>

      <div className="questionCard__bottom">
        <div className="questionCard__bottomLeft">
          <div className="questionCard__bottomOption">
            <VisibilityOutlined className="questionCard__bottomIcon" />
            <p>{noOfFollow}</p>
            <p>Follow</p>
          </div>
          {/* <div className="questionCard__bottomOption">
                        <ShareOutlined className="questionCard__bottomIcon"/>
                        <p>{noOfShare}</p>
                        <p>Share</p>
                    </div> */}
        </div>
        <div className="questionCard__bottomLeft">
          {/* <div className={`questionCard__bottomOption ${ answersBox && "questionCard__bottomOptionAnsBox"} `}>
                        <FontAwesomeIcon icon={faComment} className="questionCard__bottomIcon"/>
                        <p>{noOfAnswer}</p>
                        <p>answers</p>
                    </div> */}
          <div
            className={`questionCard__bottomOption ${
              answer && "questionCard__bottomOptionAns"
            } `}
          >
            <Edit className="questionCard__bottomEditIcon" />
            <p>{noOfAnswer}</p>
            <p>Answer</p>
          </div>
        </div>
      </div>

      <Drawer
        anchor="bottom"
        open={state.bottom}
        onClose={toggleDrawer("bottom", false)}
        onOpen={toggleDrawer("bottom", true)}
      >
        {list("bottom")}
      </Drawer>
    </div>
  );
}

export default QuestionCard;
