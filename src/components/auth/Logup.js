import { Button, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from"@mui/icons-material";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Go from "../../images/Go.png";
import Hook from "../../images/Hook.jpg";
import "../../styles/Login.css";
import useInput from "../../utils/useInput";
import { createUserWithEmailAndPassword } from "@firebase/auth";
import { auth } from "../../firebase";

function Logup() {
	// const { ...firstName } = useInput("");
	// const { ...lastName } = useInput("");
	const { ...email } = useInput("");
	const { ...password } = useInput("");
	const { ...confirmPassword } = useInput("");
	const [showPassword, setShowPassword] = useState(false);
	// const [userSignUpData, setUserUpData] = useState({});

	const toggleShowPassword = () => {
		setShowPassword(!showPassword);
	};

	const signUpWithGoogle = async () => {};

	const createAccount = async (e) => {
		if (password.value !== confirmPassword.value) {
			return;
		}

		try {
			const result = await createUserWithEmailAndPassword({
				auth,
				email: email.value,
				password: password.value,
			});
			console.log(result);
		} catch (error) {
			console.log(error);
		}
	};

	console.log({ ...password });

	return (
		<div className="logup">
			<div className="login__top">
				<Link to="/">
					<img className="hookLogo" src={Hook} alt="" />
				</Link>
			</div>
			<div className="login__containerTitle">
				<div className="login__flexTitle">
					<h2>Sign Up</h2>
				</div>
			</div>
			<div className="login__container">
				{/* <form className={`login__form ${Logup &&"logup__form"}`}> */}
				<form className="login__form">
					{/* <div className="login__inputOption">
						<input
							className="login__formInput"
							type="text"
							placeholder="First Name"
							{...firstName}
						/>
					</div>
					<div className="login__inputOption">
						<input
							className="login__formInput"
							type="text"
							placeholder="Last Name"
							{...lastName}
						/>
					</div> */}
					<div className="login__inputOption">
						<input
							className="login__formInput"
							type="text"
							placeholder="Email"
							{...email}
						/>
					</div>
					<div className="login__inputOption">
						<input
							className="login__formInput"
							type={showPassword ? "text" : "password"}
							placeholder="Password"
							{...password}
						/>
						<IconButton onClick={toggleShowPassword}>
							{showPassword ? <VisibilityOff /> : <Visibility />}
						</IconButton>
					</div>
					<div className="login__inputOption">
						<input
							className="login__formInput"
							type={showPassword ? "text" : "password"}
							placeholder="Repeat password"
							{...confirmPassword}
						/>
						<IconButton onClick={toggleShowPassword}>
							{showPassword ? <VisibilityOff /> : <Visibility />}
						</IconButton>
					</div>
					<Button className="signIn__button" onClick={createAccount}>
						Sign Up
					</Button>
					<div className="login__formDivider">
						<hr />
						<p>or</p>
						<hr />
					</div>
					<Button
						className="signInWithGoogle__button"
						onClick={signUpWithGoogle}>
						<img className="googleLogo" src={Go} alt="" />
						Continue with Google
					</Button>
					<p className="login__newUser">
						Already have an account?
						<Link to="/signin">
							<span>Sign In</span>
						</Link>
					</p>
				</form>
			</div>
		</div>
	);
}

export default Logup;
