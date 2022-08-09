import { Close, KeyboardArrowUp } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { Avatar } from "@mui/material";
// import { makeStyles } from "@mui/styles";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/AddPost.css";
import { createPost, sendLink } from "../../actions/posts";
import { useDispatch, useSelector } from "react-redux";
import { useStateContex } from "../../store/StateProvider";
import useToggle from "../../utils/useToggle";
import Input from "./forms/Input";
import useClickState from "../../utils/useClickState";
import AddPostBottom from "./AddPostBottom";
import Resizer from "react-image-file-resizer";
// import cloudinary from 'cloudinary-react'

// async function readDataUrl(file) {
//   return new Promise((resolve, reject) => {
//     const reader = new FileReader();
//     // async event handlers
//     reader.onload = (e) => resolve(reader.result);
//     reader.onerror = (e) => reject(reader.error);
//     reader.readAsDataURL(file);
//   });
// }

// cloudinary.config({
//   cloud_name: process.env.REACT_APP_CLOUD_NAME,
//   api_key: process.env.REACT_APP_API_KEY,
//   api_secret: process.env.REACT_APP_API_SECRET
// });

// const ITEM_HEIGHT = 100;
// const ITEM_PADDING_TOP = 10;
// const MenuProps = {
//   PaperProps: {
//     style: {
//       maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
//       width: 250,
//     },
//   },
// };

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
  const { darkMode } = useStateContex();
  const { value, toggleValue } = useToggle(true);
  const user = JSON.parse(localStorage.getItem("profile"))
  const { link } = useSelector((state) => state.posts);
  const linkUrl = formData.link;
  const [imageData, setImageData] = useState([]);
  const [imgPlaceholder, setImgPlaceholder] = useState(null);


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

  const handleImage = (e) => {
    const file = e.target.files[0];

    Resizer.imageFileResizer(
      file,
      600,
      700,
      "JPEG",
      80,
      0,
      (uri) => {
        setImage(uri);
      },
      "base64"
    );

    Resizer.imageFileResizer(
      file,
      50,
      50,
      "JPEG",
      70,
      0,
      (uri) => {
        setImgPlaceholder
        (uri);
      },
      "base64"
    );
    if (file["type"].split("/")[0] !== "image") {
      alert("Hehehe 😆 file is not an image");
    }
    // setFileToBase(file);
  };
  // const setFileToBase = (fileData) =>{
  //     const reader = new FileReader();
  //     reader.readAsDataURL(file);
  //     reader.onloadend = () =>{
  //         setImage(reader.result);
  //     }

  // }

  // const convertToBase64 = (gg) => {
  //   console.log("Enter base64 covert");
  //   return new Promise((resolve) => {
  //     var reader = new FileReader();
  //     reader.onload = function () {
  //       resolve(reader.result);
  //     };
  //     reader.readAsDataURL(gg);
  //   });
  // };


  const files = [imgPlaceholder, image]

  const uploadImage = () => {
    for (let i = 0; i < files.length; i++) {
      let file = files[i];
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "whhgiuh7");
      data.append("cloud_name", "gasod");
      data.append("folder", "posts");
      fetch("https://api.cloudinary.com/v1_1/gasod/image/upload", {
      method: "post",
        body: data,
        mode: "cors",
      })
        .then((resp) => resp.json())
        .then((data) => {
          // setImageData({ url: data.secure_url, public_id: data.public_id });
          console.log(data)
          setImageData(current => [...current, data])
        })
        .catch((err) => console.log(err));
    }
  };
  

  useEffect(
    (e) => {
      if (linkUrl) dispatch(sendLink({ link: linkUrl }));
      if (formData.link && !formData.description) {
        setFormData({ ...formData, description: link.title });
      }
      if (image) uploadImage();
    },
    [linkUrl, image]
  );

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(
      createPost({
        ...formData,
        linkData: {
          siteName: link.site_name,
          linkTitle: link.title,
          linkImage: link.image,
          linkDesc: link.description,
        },
        imageData: {
          image_url: imageData[1]?.secure_url,
          image_id: imageData[1]?.public_id,
          image_placeholderId: imageData[0]?.public_id,
          image_placeholder: imageData[0]?.secure_url,
        },
        creatorName: user?.result?.displayName || user?.result?.name,
        userId: user?.result?.uid,
        userDp: user?.result?.photoURL,
      })
    );
    setFormData(initialState);
    // setImage(null);

    navigate("/");
  };

  // const cancelSelectImg = () => {
  //   setImage(null);
  // };

  // const l = 4;
  // const characterLimit = 10;
  // const cc = (l / characterLimit) * 360;
console.log(imageData)
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

        {imageClicked && image && (
          <Input
            handleChange={handleChange}
            name="description"
            autoFocus={true}
            placeholder="Say something about it"
          />
        )}

        {
          image && (
            // <div className=''>
            <img src={image} alt="" maxheight={500} />
          )
          // </div>
        }

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
            multiline={0}
            placeholder="Enter a link"
          />
        )}
        {formData.link.trim() && linkClicked && formData.link.length > 0 && (
          <Input
            handleChange={handleChange}
            name="description"
            placeholder={
              link.title || "Say something about this link (optional)"
            }
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
          choseImg={handleImage}
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
