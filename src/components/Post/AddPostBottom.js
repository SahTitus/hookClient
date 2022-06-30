import {
  LinkOutlined,
  PhotoOutlined,
  PollOutlined,
  QuestionMarkOutlined,
  TextFields,
} from "@mui/icons-material";
import { ClickAwayListener, IconButton } from "@mui/material";
import React, { useRef } from "react";

function AddPostBottom({
  toggleValue,
  toImg,
  toPoll,
  toQue,
  toLink,
  toText,
  imageClicked,
  linkClicked,
  questionClicked,
  pollClicked,
  textClicked,
  choseImg
}) {

  let inputFileRef = useRef(null);
  const selectImg = (e) => {
    toImg()
    	e.preventDefault();
		inputFileRef.click();
  }


  return (
    <ClickAwayListener onClickAway={(event) => toggleValue()}>
      <div className="addPost__bottom">
        <p>What Are You Posting?</p>
        <div className="addPost__bottomChild">
          <div className="addPost__option">
            <IconButton
              onClick={toText}
              id={`${textClicked && "addPost__optionBtnIcon"}`}
            >
              <TextFields
                className={`btnIcon  ${textClicked && "addPost__optionIcon"}`}
              />
            </IconButton>
            <p className={`${textClicked && "addPost__optionText"}`}>Text</p>
          </div>
          <div className="addPost__option">
            <IconButton
              onClick={toQue}
              id={`${questionClicked && "addPost__optionBtnIcon"}`}
            >
              <QuestionMarkOutlined
                className={`btnIcon  ${
                  questionClicked && "addPost__optionIcon"
                }`}
              />
            </IconButton>

            <p className={`${questionClicked && "addPost__optionText"}`}>Ask</p>
          </div>
          <input
						multiple
						onChange={choseImg}
						ref={(input) => (inputFileRef = input)}
						style={{ display: "none" }}
						type="file"
					/>
          <div className="addPost__option">
            <IconButton
              onClick={selectImg}
              id={`${imageClicked && "addPost__optionBtnIcon"}`}
            >
              <PhotoOutlined
                className={`btnIcon ${imageClicked && "addPost__optionIcon"}`}
              />
            </IconButton>
            <p className={`${imageClicked && "addPost__optionText"}`}>Image</p>
          </div>
          <div className="addPost__option">
            <IconButton
              onClick={toPoll}
              id={`${pollClicked && "addPost__optionBtnIcon"}`}
            >
              <PollOutlined
                className={`btnIcon ${pollClicked && "addPost__optionIcon"}`}
              />
            </IconButton>
            <p className={`${pollClicked && "addPost__optionText"}`}>Poll</p>
          </div>
          <div className="addPost__option">
            <IconButton
              onClick={toLink}
              id={`${linkClicked && "addPost__optionBtnIcon"}`}
            >
              <LinkOutlined
                className={`btnIcon ${linkClicked && "addPost__optionIcon"}`}
              />
            </IconButton>
            <p className={`${linkClicked && "addPost__optionText"}`}>Link</p>
          </div>
        </div>
      </div>
    </ClickAwayListener>
  );
}

export default AddPostBottom;
