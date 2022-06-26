import {
  PhotoOutlined,
  PollOutlined,
  Close,
  LinkOutlined,
  QuestionMarkOutlined,
  TextFields,
  KeyboardArrowUp,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import {
  Avatar,
  Box,
  ClickAwayListener,
  Dialog,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Paper,
  Select,
  Slide,
  TextareaAutosize,
  TextField,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { forwardRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/AddPost.css";
import SelectHall from "../pages/SelectHall";
import useInput from "../utils/useInput";
import CreatePost from "../components/Post/forms/CreatePost";
import { createPost } from "../actions/posts";
import { useDispatch } from "react-redux";
import { useStateContex } from "../store/StateProvider";
import useToggle from "../utils/useToggle";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ITEM_HEIGHT = 100;
const ITEM_PADDING_TOP = 10;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const useStyles = makeStyles((theme) => ({
  input: {
    minHeight: 10,
    bgcolor: '#000',
  },
  textField: {
    width: "100%",
    // maxheight: 30,
    bgcolor: 'red',
    marginBottom: '50px',
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderRadius: "5px",
        borderColor: "#fff",
        padding: '0',
        bgcolor: 'red',
      },
      "&.Mui-focused fieldset": {
        borderColor: "green",
        padding: '0',
      },
    },
  },

}));

function AddPost() {
  // const [openHallList, setOpenHallList] = useState(false);
  const [imageClicked, setImageClicked] = useState(false);
  const [textClicked, setTextClicked] = useState(true);
  const [pollClicked, setPollClicked] = useState(false);
  const [linkClicked, setLinkClicked] = useState(false);
  const [questionClicked, setQuestionClicked] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const classes = useStyles();
  const { darkMode } = useStateContex();
  const { value, toggleValue } = useToggle(true);

  const image = useInput("");
  const text = useInput("");
  const question = useInput("");
  const description = useInput("");
  const pollOptions = useInput("");
  const link = useInput("");

  const postData = {
    image: image.value,
    text: text.value,
    question: question.value,
    pollOptions: pollOptions.value,
    link: link.value,
    description: description.value,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(createPost(postData));
    navigate("/");
    // handleDialogState();
  };

  // const handleOpenHallList = () => {
  //   setOpenHallList(true);
  // };

  // const handleClose = () => {
  //   setOpenHallList(false);
  // };

  const toggleTextClick = () => {
    setImageClicked(false);
    setTextClicked(true);
    setPollClicked(false);
    setLinkClicked(false);
    setQuestionClicked(false);
  };
  const toggleImageClick = () => {
    setImageClicked(true);
    setTextClicked(false);
    setPollClicked(false);
    setLinkClicked(false);
    setQuestionClicked(false);
  };
  const togglePollClick = () => {
    setImageClicked(false);
    setTextClicked(false);
    setPollClicked(true);
    setLinkClicked(false);
    setQuestionClicked(false);
  };
  const toggleQuestionClick = () => {
    setImageClicked(false);
    setTextClicked(false);
    setPollClicked(false);
    setLinkClicked(false);
    setQuestionClicked(true);
  };
  const toggleLinkClick = () => {
    setImageClicked(false);
    setTextClicked(false);
    setPollClicked(false);
    setLinkClicked(true);
    setQuestionClicked(false);
  };

  const l = question.value.length
  const characterLimit = 10;
  const cc = (l/characterLimit) * 360

  return (
    <form className="addPost">
      <div className="addPost__header">
        <Close onClick={() => navigate(-1)} className="addPost__headerIcon" />
        <button onClick={handleSubmit} type="submit">
          Post
        </button>
      </div>
      <div className="addPost__top">
        <Link to="/profile">
          <Avatar className="addPost__avatar" />
        </Link>
        <SelectHall />

        {/* THE DIV AROUND THE FORMCONTROL IS TO HIDE THE CODES THERE */}
        <div>
          {/* <FormControl id="appPost__whoSeeFormCtrl" sx={{ m: 1, width: 300 }}>
            <Select
              labelId="demo-multiple-name-label"
              id="appPost__select"
              input={<OutlinedInput />}
              {...whoSee}
              MenuProps={MenuProps}
              // defaultValue='Public'
            >
              <MenuItem value="Public">Public</MenuItem>
              <MenuItem value={selectedHall} onClick={handleOpenHallList}>{selectedHall}</MenuItem>
            </Select>
          </FormControl> */}
        </div>
      </div>
{/* 
      <div>
         <Dialog
        fullScreen
        open={openHallList}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <div className="select__hallTop">
          <div className="select__hallSearch">
            <form className="select__hallSearchContainer">
              <Search className="select__hallSearchIcon" />
              <input type="text" placeholder="Search halls..." />
            </form>
          </div>
          <IconButton
							edge="start"
							color="inherit"
							onClick={handleClose}
							aria-label="close"
							style={{ margin: "0 5px" }}>
							<Close style={{color: 'gray'}}/>
						</IconButton>
        </div>

        <div className="select__hallList">
								{halls.map((hall, index) => (
									<MenuItem 
                  {...hallName}
                  onClick={handleClose}
                   key={hall + index} >
										{hall}
									</MenuItem>
								))}
        </div>
      </Dialog> 
      </div> */}

      <div className='textFields'>
        {textClicked && (
          <div className="textField">
          <TextareaAutosize
            className='textArea'
            placeholder="What's happening?"
            multiline
            autoFocus
            required
            style={{marginTop: '20px',}}
          />
          </div>
        )}

        {questionClicked && (
          <div className="textField">
            <TextareaAutosize
              className='textArea'
              placeholder="Ask something here..."
              multiline
              autoFocus
              fullWidth
              required
              maxLength={10}
              style={{marginTop: '20px',}}
              {...question}
            />
            {/* <p>{cc}</p> */}
          </div>
        )}

        {(question.value && questionClicked) && (
          <div className="textField">
            <TextareaAutosize
              className='textArea'
              placeholder="Add question details here (optional)"
              multiline
              fullWidth
               style={{marginTop: '30px',}}
            />
          </div>
        )}
        {(imageClicked ) && (
          <div className="textField">
            <TextareaAutosize
              className='textArea'
              placeholder="Say something about it "
              multiline
              autoFocus
              fullWidth
               style={{marginTop: '20px',}}
            />
          </div>
        )}
        {(pollClicked) && (
          <div className="textField">
            <TextareaAutosize
              className='textArea'
              placeholder="Add poll question here"
              multiline
              fullWidth
              autoFocus
               style={{marginTop: '20px',}}
            />
          </div>
        )}
        {(linkClicked) && (
          <div className="textField">
            <TextareaAutosize
              className='textArea'
              placeholder="Say something about this link (optional)"
              multiline
              fullWidth
               style={{marginTop: '20px',}}
            />
          </div>
        )}


      </div>

      {!value && (
        <div onClick={toggleValue} className="addPost__bottomExpand">
          <KeyboardArrowUp style={{ fontSize: "30px" }} />
        </div>
      )}

      {value && (
        <ClickAwayListener onClickAway={(event) => toggleValue()}>
          <div className="addPost__bottom">
            <p>What Are You Posting?</p>

            <div className="addPost__bottomChild">
              <div className="addPost__option">
                <IconButton
                  onClick={toggleTextClick}
                  id={`${textClicked && "addPost__optionBtnIcon"}`}
                >
                  <TextFields
                    className={`${textClicked && "addPost__optionIcon"}`}
                  />
                </IconButton>
                <p className={`${textClicked && "addPost__optionText"}`}>
                  Text
                </p>
              </div>
              <div className="addPost__option">
                <IconButton
                  onClick={toggleQuestionClick}
                  id={`${questionClicked && "addPost__optionBtnIcon"}`}
                >
                  <QuestionMarkOutlined
                    className={`${questionClicked && "addPost__optionIcon"}`}
                  />
                </IconButton>

                <p className={`${questionClicked && "addPost__optionText"}`}>
                  Ask
                </p>
              </div>
              <div className="addPost__option">
                <IconButton
                  onClick={toggleImageClick}
                  id={`${imageClicked && "addPost__optionBtnIcon"}`}
                >
                  <PhotoOutlined
                    className={`${imageClicked && "addPost__optionIcon"}`}
                  />
                </IconButton>
                <p className={`${imageClicked && "addPost__optionText"}`}>
                  Image
                </p>
              </div>
              <div className="addPost__option">
                <IconButton
                  onClick={togglePollClick}
                  id={`${pollClicked && "addPost__optionBtnIcon"}`}
                >
                  <PollOutlined
                    className={`${pollClicked && "addPost__optionIcon"}`}
                  />
                </IconButton>
                <p className={`${pollClicked && "addPost__optionText"}`}>
                  Poll
                </p>
              </div>
              <div className="addPost__option">
                <IconButton
                  onClick={toggleLinkClick}
                  id={`${linkClicked && "addPost__optionBtnIcon"}`}
                >
                  <LinkOutlined
                    className={`${linkClicked && "addPost__optionIcon"}`}
                  />
                </IconButton>
                <p className={`${linkClicked && "addPost__optionText"}`}>
                  Link
                </p>
              </div>
            </div>
          </div>
        </ClickAwayListener>
      )}
    </form>
  );
}

export default AddPost;
