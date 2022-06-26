import { Edit, EditOutlined } from "@mui/icons-material";
import {  PhotoOutlined, QuestionMarkOutlined } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { useStateContex } from "../../../store/StateProvider";
import style from "../../../styles/CreatePost.module.css";

function CreatePost({
  text,
  image,
  question,
  toggleImage,
  toggleQuestion,
  toggleText,
}) {

  const { darkMode } = useStateContex()

  return (
    
      <div className={`${style.createPost} ${darkMode && style.createPost__dark}`}>
        {/* <Link to="/addPost"> */}
        <div className={style.formContainer}>
        {/* <Edit className={style.write} /> */}
          <input
            className={style.input}
            type="text"
            placeholder="What's happening?"
          />
          <div className={style.options}>

            <div className="addPost__option">
              <Link to="/addPost">
                <IconButton
                  id={`${image && "addPost__optionBtnIcon"}`}
                >
                  <PhotoOutlined className={`${style.icon } ${darkMode && style.iconDark}`} />
                </IconButton>
              </Link>
            </div>
            <div className="addPost__option">
              <IconButton
                id={`${question && "addPost__optionBtnIcon"}`}
              >
                <EditOutlined className={`${style.icons } ${darkMode && style.iconDark}`} />
              </IconButton>
            </div>
          </div>
        </div>
        {/* </Link> */}
      </div>

  );
}

export default CreatePost;
