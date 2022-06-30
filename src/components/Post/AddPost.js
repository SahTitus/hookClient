import { Close, KeyboardArrowUp } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { Avatar } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { forwardRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/AddPost.css";
import { createPost } from "../../actions/posts";
import { useDispatch } from "react-redux";
import { useStateContex } from "../../store/StateProvider";
import useToggle from "../../utils/useToggle";
import Input from "./forms/Input";
import useClickState from "../../utils/useClickState";
import AddPostBottom from "./AddPostBottom";

async function readDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    // async event handlers
    reader.onload = (e) => resolve(reader.result);
    reader.onerror = (e) => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

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

const initialState = {
  text: "",
  question: "",
  pollOptions: "",
  link: "",
  description: "",
};

function AddPost() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState(initialState);
  const [image, setImage] = useState(null);
  const [imgUrl, setImgUrl] = useState(null);
  const { darkMode } = useStateContex();
  const { value, toggleValue } = useToggle(true);
  const [showImgPrev, setShowImgPrev] = useState(false)

  console.log(image);

  const {
    toggleImageClick,
    togglePollClick,
    toggleQuestionClick,
    toggleLinkClick,
    toggleTextClick,
    imageClicked,
    linkClicked,
    questionClicked,
    pollClicked,
    textClicked,
  } = useClickState();

  // const disable = ( questionClicked &&
  //    (!formData.question.length > 0 ) || formData.question.trim()) ||(textClicked && (!formData.text.length > 0 ) || !formData.text.trim()) || (linkClicked && !formData.link.length > 0) || (pollClicked && !formData.poll.length > 0) || (imageClicked && !formData.image
  //     )

  const handleImgInput = (e) => {
    const file = e.target.files[0];

    if (!file.type.startsWith("image/")) {
      alert("Hehehe 😆 file is not an image");
      return;
    }

    readDataUrl(file).then((baseImg) => {
      setImage(baseImg);
      setShowImgPrev(true)
    });
  };

  const uploadImage = (e) => {
    e.preventDefault();
    setShowImgPrev(false)
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "whhgiuh7");
    data.append("cloud_name", "gadod");
    fetch("https://api.cloudinary.com/v1_1/gasod/image/upload", {
      method: "post",
      body: data,
    })
      .then((resp) => resp.json())
      .then((data) => {
        setImgUrl(data.url);
        console.log(data.url);
      })
      .catch((err) => console.log(err));
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(createPost({ ...formData, image: imgUrl }));
    setFormData(initialState);
    console.log(formData);
    setImage(null)

    navigate("/");
  };

  // const l = 4;
  // const characterLimit = 10;
  // const cc = (l / characterLimit) * 360;

  return (
    <form className={`addPost ${darkMode && "addPostDark"}`}>
      <div className="addPost__header">
        <Close onClick={() => navigate(-1)} className="addPost__headerIcon" />
        <button
          // className={`${disable && "disablePost"}`}
          // disabled={disable}
          onClick={handleSubmit}
          type="submit"
        >
          Post
        </button>
      </div>
      <div className="addPost__top">
        <Link to="/profile">
          <Avatar className="addPost__avatar" />
        </Link>
      </div>

      <div className="textFields">
        {textClicked && (
          <Input
            name="text"
            handleChange={handleChange}
            autoFocus={true}
            placeholder="What's happening?"
          />
        )}

        {questionClicked && (
          <Input
            handleChange={handleChange}
            name="question"
            autoFocus={true}
            placeholder="Ask a question here..."
          />
        )}

        {formData.question.trim() &&
          questionClicked &&
          formData.question.length > 0 && (
            <Input
              handleChange={handleChange}
              name="description"
              placeholder="Add your question details (optional)"
            />
          )}

        {(imageClicked && image) && (
          <Input
            handleChange={handleChange}
            name="description"
            autoFocus={true}
            placeholder="Say something about it"
          />
        )}

        {image && 
        // <div className=''>
          <img src={image} alt="" height={280} />
        // </div>
        }

        {showImgPrev && imageClicked && (
          <div className="imgPreview">
            <div className="prevChild">
              <div className="prevChild__top">
                <Close onClick={() => setImage(null)}className="prevChild__topIcon" />
                <button onClick={uploadImage}> Confirm</button>
              </div>


                <img src={image} alt="" />

            </div>
          </div>
        )}

        {pollClicked && (
          <Input
            handleChange={handleChange}
            name="poll"
            autoFocus={true}
            placeholder="Add poll question"
          />
        )}

        {linkClicked && (
          <Input
            handleChange={handleChange}
            name="link"
            autoFocus={true}
            multiline={false}
            placeholder="Enter a link"
          />
        )}
        {formData.link.trim() && linkClicked && formData.link.length > 0 && (
          <Input
            handleChange={handleChange}
            name="description"
            placeholder="Say something about this link (optional)"
          />
        )}
      </div>

      {value && (
        <AddPostBottom
          toImg={toggleImageClick}
          toPoll={togglePollClick}
          toQue={toggleQuestionClick}
          toLink={toggleLinkClick}
          toText={toggleTextClick}
          imageClicked={imageClicked}
          linkClicked={linkClicked}
          questionClicked={questionClicked}
          pollClicked={pollClicked}
          textClicked={textClicked}
          toggleValue={toggleValue}
          choseImg={handleImgInput}
        />
      )}

      {!value && (
        <div onClick={toggleValue} className="addPost__bottomExpand">
          <KeyboardArrowUp style={{ fontSize: "30px" }} />
        </div>
      )}
    </form>
  );
}

export default AddPost;
