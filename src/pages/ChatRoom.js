import { Avatar, IconButton, TextField } from "@mui/material";
import React, { useState } from "react";
import {AttachFile, Send, InsertEmoticonOutlined, MoreVert } from "@mui/icons-material";
import "../styles/ChatRoom.css";
// import { AvatarGenerator } from 'random-avatar-generator'
// import firebase from "firebase"
// import db from '../firebase'


function ChatRoom() {
	const [input, setInput] = useState("");
	const [messages, setMessage] = useState([
		{ username: " Sah", message: " hey food" },
	]);
	const [username, setUsername] = useState("");

	// const generator = new AvatarGenerator();
	// const avatar1 = generator.generateRandomAvatar();

	const sendMessage = (event) => {
		// db.collection("messages").add({
		//     username: username,
		//     message: input,
		//     timestamp: firebase.firestore.FieldValue.serverTimestamp()
		//        })
		setInput("");
		event.preventDefault();
	};

	// useEffect(() => {
	//     db.collection('messages').orderBy("timestamp", "asc").onSnapshot(snapshot => {
	//         setMessage(snapshot.docs.map(doc => ({
	//             id: doc.id,
	//             username: doc.data().username,
	//             message: doc.data().message,
	//             timestamp: doc.data().timestamp
	//         })))
	//     })
	// }, [])

	//  useEffect(() => {
	//    setUsername(prompt('Enter your name here'))
	//  }, [])

	console.log(messages);

	return (
		<div className="chatRoom">
			<div className="chatRoom__header">
				<div className="chatRoom__headerLeft">
					<Avatar src={""} className="chatRoom__headerAvatar" />
					<div className="chatRoom__headerLeftInfo">
						<h4>HOOK</h4>
						<p> 🔵 online</p>
					</div>
				</div>
				<div className="chatRoom__headerRight">
					<IconButton>
						<AttachFile />
					</IconButton>
					<IconButton>
						<MoreVert />
					</IconButton>
				</div>
			</div>
			<div className="chatRoom__body">
				{messages.map((message, index) => (
					<p
						key={message.id + index}
						className={`chatRoom__message ${
							username === message.username && "chatRoom__receipient"
						}`}>
						<span>{message.username}</span>
						{message.message}
						<span className="chatRoom__timestamp">
							{new Date(message.timestamp?.toDate()).toUTCString()}
						</span>
					</p>
				))}
			</div>
			<div className="chatRoom__footer">
				<InsertEmoticonOutlined className="chatRoom__footerIcons" />
				<AttachFile className="chatRoom__footerIcons" />
				<form>
					{/* <input
						value={input}
						onChange={(e) => setInput(e.target.value)}
						className="chatRoom__footerInput"
						type="text"
						placeholder="Enter a message here"
					/> */}
					<TextField
						className="chatRoom__footerTextField"
						maxRows={20}
						// rows={2}
						id="standard-textarea"
						value={input}
						onChange={(e) => setInput(e.target.value)}
						type="text"
						multiline
						variant="standard"
						placeholder="Enter a message here"
					/>
					{input === "" ? null : (
						<button
							className="chatRoom__footerSendBtn"
							onClick={sendMessage}
							type="submit">
							<Send className="chatRoom__footerSendIcon" />
						</button>
					)}
				</form>
			</div>
		</div>
	);
}

export default ChatRoom;
