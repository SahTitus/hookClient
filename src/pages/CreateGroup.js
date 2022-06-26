import { Button, MenuItem, TextField, Slide } from "@mui/material";
import { Close } from "@mui/icons-material";
import React, { forwardRef } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/CreateGroup.css";
import useInput from "../utils/useInput";

const Transition = forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

function CreateGroup() {
	const navigate = useNavigate();
	const {reset: resetGdesc, ...groupDescription } = useInput("");
	const { ...groupType } = useInput("Public");
	const {reset, ...groupName } = useInput("");

	const createGroup = async (e) => {
		e.preventDefault();
	// 	let groupData = {
	// 		groupName: groupName.value,
	// 		groupType: groupType.value,
	// 		groupDescription: groupDescription.value,
	// 	};
	// 	resetGdesc();
	// 	reset();
	};

	console.log({groupName})
	return (
		<div TransitionComponent={Transition} className="createGroup">
			<div className="createGroup__header">
				<Close
					onClick={() => navigate(-1)}
					className="createGroup__headerIcon"
				/>
				<div className="createGroup__headerTitle">
					<h4>Create a Hall</h4>
				</div>
			</div>

			<div className="createGroup__formContainer">
				<form className="createGroup__form">
					<h4>Name</h4>
					<input type="text" placeholder="Hall name here..." {...groupName} />

					<h4>Hall type</h4>

					<TextField
						style={{ marginBottom: 20 }}
						fullWidth
						select
						{...groupType}
						defaultValue="Public">
						<MenuItem value="Public">Public</MenuItem>
						<MenuItem value="Private">Private</MenuItem>
					</TextField>

					<h4>Descriptions</h4>
					<p>Give a short details of your hall to help people identify it.</p>
					<input type="text" placeholder="" {...groupDescription} />

					<Button
						className="createGroup__formButton"
						onClick={createGroup}
						type="submit"
						disabled={
							groupName.value === '' ||
							groupDescription.value === null
						}>
						Create Hall
					</Button>
				</form>
			</div>
		</div>
	);
}

export default CreateGroup;
