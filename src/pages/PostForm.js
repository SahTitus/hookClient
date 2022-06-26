import {
	Select,
	MenuItem,
	Avatar,
	TextField,
	InputAdornment,
	Input,
	FormControl,
	InputLabel,
	OutlinedInput,
	IconButton,
	Dialog,
	Slide,
} from "@mui/material";
import {
	Link,
	NotListedLocationOutlined,
	PhotoOutlined,
	PollOutlined,
	VideocamOutlined,
	Delete,
	Add,
	Close,
} from "@mui/icons-material";
import React, { useRef, useState, forwardRef } from "react";
import "../styles/PostForm.css";
import useUpload from "../utils/UploadImgVid";
import { useNavigate } from "react-router-dom";
// import { addDoc, collection, serverTimestamp } from "@firebase/firestore";
import useInput from "../utils/useInput";
// import { db } from "./firebase";
import { useDispatch } from "react-redux"
import { createPost } from "../actions/posts";

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

const groups = [
	"Food Planning",
	"Coding",
	"Motivational Zone",
	"Scientists",
	"Physics",
	"Computer Science",
	"Leadership",
	"Archaeology",
	"Health Premises",
	"Programming",
];

// function getStyles(name, personName, theme) {
// 	return {
// 		fontWeight:
// 			personName.indexOf(name) === -1
// 				? theme.typography.fontWeightRegular
// 				: theme.typography.fontWeightMedium,
// 	};
// }

function PostForm() {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const { image, clearImage, emptyImg, handleOnChangeImageInput } = useUpload();

	console.log(image);
	const inputRef = useRef();

	// useEffect(() => {
	//   inputRef.current.focus();
	// });

	// const handleChange = (event) => {
	// 	const {
	// 		target: { value },
	// 	} = event;
	// 	[setPostData(
	// 		// On autofill we get a the stringified value.
	// 		typeof value === "string" ? value.split(",") : value
	// 	);
	// };

	let inputFileRef = useRef(null);

	const handleOnChangeButton = (e) => {
		e.preventDefault();
		inputFileRef.click();
	};

	const [openQue, setOpenQue] = useState(false);
	const [openPoll, setOpenPoll] = useState(false);
	const [openLink, setOpenLink] = useState(false);

	const handleOpenPoll = () => {
		setOpenPoll(true);
	};
	const handleOpenQue = () => {
		setOpenQue(true);
	};
	const handleOpenLink = () => {
		setOpenLink(true);
	};

	const handleClose = () => {
		setOpenLink(false);
		setOpenQue(false);
		setOpenPoll(false);
	};

	const handleDialogState = () => {
		setOpenPoll(false);
		setOpenQue(false);
		setOpenLink(false);
	};

	const [inputList, setInputList] = useState([{ firstName: "", lastName: "" }]);

	// handle input change
	const handleInputChange = (e, index) => {
		const { name, value } = e.target;
		const list = [...inputList];
		list[index][name] = value;
		setInputList(list);
	};

	// handle click event of the Remove button
	const handleRemoveClick = (index) => {
		const list = [...inputList];
		list.splice(index, 1);
		setInputList(list);
	};

	// handle click event of the Add button
	const handleAddClick = () => {
		setInputList([...inputList, { firstName: "", lastName: "" }]);
		console.log(inputList);
	};

	const handleClearData = () => {
		emptyImg();
	};

	const { ...textTitle } = useInput("");
	const { ...textDescription } = useInput("");
	const { ...imageDescription } = useInput("");
	const { ...groupName } = useInput("");
	const { ...question } = useInput("");
	const { ...pollQuestion } = useInput("");
	const { ...link } = useInput("");
	const { ...linkDescription } = useInput("");
	console.log(textTitle.value);

	// const [{ posts }, dispatch] = useStateValue();

		const postData = {
			title: textTitle.value,
			description: textDescription.value,
			groupName: groupName.value,
			imageDescription: imageDescription.value,
			question: question.value,
			pollQuestion: pollQuestion.value,
			// pollOptions: pollOption.value,
			link: link.value,
			linkDescription: linkDescription.value,
			image,
		};


	const handleSubmit = async (e) => {
		e.preventDefault();
		dispatch(createPost(postData));
		handleClearData();
		navigate("/");
		handleDialogState();
	};

	return (
		<>
			<form onSubmit={handleSubmit} className="postForm">
				<div className="postForm__top">
					<Close onClick={() => navigate(-1)} className="postForm__topIcon" />
					<button onClick={handleSubmit} type="submit">
						Post
					</button>
				</div>
				<div className="post__optionContainer">
					<div className="post__optionContainerLeft">
						<Avatar className="postForm__avatar" />

						<FormControl sx={{ m: 1, width: 300 }}>
							<InputLabel className="gas">Choose a group</InputLabel>
							<Select
								labelId="demo-multiple-name-label"
								id="demo-multiple-name"
								{...groupName}
								input={<OutlinedInput />}
								MenuProps={MenuProps}>
								{groups.map((group) => (
									<MenuItem key={group + 1} value={group}>
										{group}
									</MenuItem>
								))}
							</Select>
						</FormControl>
					</div>

					<div className="post__optionContainerRight">
						{!image ? (
							<>
								<div onClick={handleOpenQue} className="post__option">
									<NotListedLocationOutlined className="post__optionIcon" />
									<p>Ask question</p>
								</div>

								<div className="post__optionBox1">
									<div onClick={handleOnChangeButton} className="post__option">
										<PhotoOutlined className="post__optionIcon" />
										<p>Image</p>
									</div>
									<div className="post__option">
										<VideocamOutlined className="post__optionIcon" />
										<p>Video</p>
									</div>
								</div>

								<div className="post__optionBox1">
									<div onClick={handleOpenPoll} className="post__option">
										<PollOutlined className="post__optionIcon" />
										<p>Poll</p>
									</div>
									<div onClick={handleOpenLink} className="post__option">
										<Link className="post__optionIcon" />
										<p>Link</p>
									</div>
								</div>
							</>
						) : null}
					</div>
				</div>

				<div className="postForm__inputs">
					{!image ? (
						<>
							<div className="pollQuestion">
								<TextField
									// maxRows={7}
									//  rows={2}
									id="standard-textarea"
									placeholder="Add a title"
									variant="standard"
									{...textTitle}
								/>
							</div>
							<div style={{ marginTop: "40px" }} className="pollQuestion">
								<TextField
									maxRows={15}
									row={0}
									id="standard-textarea"
									placeholder="Say something here..."
									multiline
									variant="standard"
									{...textDescription}
								/>
							</div>
						</>
					) : (
						<textarea
							ref={inputRef}
							className="postForm__textInput"
							type="text"
							placeholder="Say something about this photo"
							{...imageDescription}
						/>
					)}
					<input
						multiple
						onChange={handleOnChangeImageInput}
						ref={(input) => (inputFileRef = input)}
						style={{ display: "none" }}
						type="file"
					/>

					{image && (
						<>
							<button onClick={clearImage} className="closeImgButton">
								<Close />
							</button>
							<div className="imagePrev__card">
								<img src={image} alt='' className="imagePrev" />
							</div>
						</>
					)}
				</div>

				<Dialog
					fullScreen
					open={openPoll}
					onClose={handleClose}
					TransitionComponent={Transition}>
					<div className="postFormHeaders">
						<IconButton
							edge="start"
							color="inherit"
							onClick={handleClose}
							aria-label="close"
							style={{ marginLeft: "5px" }}>
							<Close />
						</IconButton>

						<IconButton
							style={{ fontSize: "20px", marginRight: "5px" }}
							autoFocus
							color="inherit"
							onClick={handleSubmit}>
							Post
						</IconButton>
					</div>

					<div className="questionInput">
						{/* <p>gggg</p> */}
						<div className="pollQuestion">
							<TextField
								maxRows={7}
								rows={2}
								id="standard-textarea"
								placeholder="Add a question here..."
								multiline
								variant="standard"
								{...pollQuestion}
							/>
						</div>

						{/* first poll input option */}
						<div className="poll__content">
							{/* <p className='pollOption__counter'>Option 1</p> */}
							<div className="pollOption">
								<input
									className="pollOption__input"
									placeholder="Enter option here..."
									value=""
									onChange={(e) => e.target.value}
								/>
							</div>
						</div>

						{/* second and + poll input options */}
						{inputList.map((x, i) => {
							return (
								<div key={i + 1} className="poll">
									<div className="poll__body">
										<div className="poll__content">
											{/* <p className='pollOption__counter'>Option 1</p> */}
											<div className="pollOption">
												<input
													className="pollOption__input"
													placeholder="Enter option here..."
													value={x.firstName}
													onChange={(e) => handleInputChange(e, i)}
												/>
											</div>

											<div className="btnBox">
												{inputList.length !== 1 && (
													<div
														className="deleteOpt"
														onClick={() => handleRemoveClick(i)}>
														<Delete />
													</div>
												)}
												{inputList.length - 1 === i && (
													<button className="addOpt" onClick={handleAddClick}>
														<Add style={{ color: "green" }} /> Add option
													</button>
												)}
											</div>
										</div>
									</div>
								</div>
							);
						})}
					</div>
				</Dialog>
				<Dialog
					fullScreen
					open={openLink}
					onClose={handleClose}
					TransitionComponent={Transition}>
					<div className="postFormHeaders">
						<IconButton
							edge="start"
							color="inherit"
							onClick={handleClose}
							aria-label="close"
							style={{ marginLeft: "5px" }}>
							<Close />
						</IconButton>

						<IconButton
							onClick={handleSubmit}
							style={{ fontSize: "20px", marginRight: "5px" }}
							autoFocus
							color="inherit"
							>
							Post
						</IconButton>
					</div>

					<div className="linkInput">
						<div className={`pollQuestion ${link && "linkInputContainer"}`}>
							<div
								style={{ marginTop: "30px", marginBottom: "40px" }}
								className="pollQuestion">
								<TextField
									maxRows={15}
									row={0}
									id="standard-textarea"
									placeholder="Say something about the link"
									multiline
									variant="standard"
									{...linkDescription}
								/>
							</div>
							<FormControl variant="standard">
								<Input
									startAdornment={
										<InputAdornment>{/* <Link /> */}</InputAdornment>
									}
									id="standard-textarea"
									placeholder="Enter your link here..."
									multiline
									variant="outlined"
									{...link}
								/>
							</FormControl>
						</div>
					</div>
				</Dialog>
				<Dialog
					fullScreen
					open={openQue}
					onClose={handleClose}
					TransitionComponent={Transition}>
					<div className="postFormHeaders">
						<IconButton
							edge="start"
							color="inherit"
							onClick={handleClose}
							aria-label="close"
							style={{ marginLeft: "5px" }}>
							<Close />
						</IconButton>
						<IconButton
							onClick={handleSubmit}
							style={{ fontSize: "20px", marginRight: "5px" }}
							autoFocus
							color="inherit">
							Post
						</IconButton>
					</div>

					<div className="questionInput">
						{/* <p>gggg</p> */}
						<div className="pollQuestion">
							<TextField
								maxRows={10}
								rows={2}
								id="standard-textarea"
								placeholder="Add a question here..."
								multiline
								variant="outlined"
								{...question}
							/>
						</div>
					</div>
				</Dialog>
			</form>
		</>
	);
}

export default PostForm;
