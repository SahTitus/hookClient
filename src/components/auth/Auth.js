import { Button } from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Go from "../../images/Go.png";
import FbD from "../../images/FbD.png";
import Gd from "../../images/Gd.png";
import Fb from "../../images/Fb.jpg";
import Hook from "../../images/Hook.jpg";
import "../../styles/Login.css";
import { createUserWithEmailAndPassword, FacebookAuthProvider, signInWithPopup, GoogleAuthProvider } from "@firebase/auth";
import { auth } from "../../firebase";
import Input from "./Input";
import { useStateContex } from "../../store/StateProvider";

const initialState = { email: "", password: "", confirmPassword: "" };

function Auth() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const { darkMode } = useStateContex();

  const [user, setUser] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const toggleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();

    try {
    const user  = await signInWithPopup(auth, provider)
      console.log(user)
    } catch (error) {
      console.log(error)
    }
    
  };

  const signInWithFacebook = async () => {
    try {
      const provider = new FacebookAuthProvider();
     await signInWithPopup(auth, provider)
      .then((result) => console.log(result))
    } catch (error) {
      console.log(error)
    }
    
  };

  const signInWithEmailAndPassword = async (e) => {
    try {
      const result = await createUserWithEmailAndPassword({
        auth,
        // email: email,
        // password: password,
      });
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormData({ ...formData, initialState: "" });
    console.log(formData);
  };

  return (
   <div className={`logi ${darkMode && "loginDark"}`}>
      <div className="login__top">
        <Link to="/">
          <img className="hookLogo" src={Hook} alt="" />
        </Link>
      </div>
      <div className="login__containerTitle">
        <div className="login__flexTitle">
          <h2>{user ? "Sign In" : "Sign Up"}</h2>
        </div>
      </div>
      <div className="login__container">
        <form className="login__form">
         {!user && (
          <>
           <Input
           autoFocus={true}
           type="text"
           placeholder=" First Name"
           name="firstName"
           handleChange={handleChange}
         />
         <Input
           type='text'
           placeholder="Last Name"
           name="lastName"
           handleChange={handleChange}
         />
         </>
         )}
          <Input
            autoFocus={true}
            type="text"
            placeholder="Email"
            name="email"
            handleChange={handleChange}
          />
          <Input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            name="password"
            handleChange={handleChange}
            toggleShowPassword={toggleShowPassword}
          />
          {!!formData.password.length && (
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Confirm password"
              name="confirmPassword"
              handleChange={handleChange}
              toggleShowPassword={toggleShowPassword}
            />
          )}

          <Button
            className="signIn__button"
            onClick={handleSubmit}
            // onClick={signInWithEmailAndPassword}
          >
            {user ? "Sign In" : "Sign Up"}
          </Button>
          <div className="login__formDivider">
            <hr />
            <p>or</p>
            <hr />
          </div>
		  <Button
            className="signInWithGoogle__button"
            onClick={signInWithGoogle}
          >
            {darkMode ? <img className="googleLogo" src={Gd} alt="" /> : <img className="googleLogo" src={Go} alt="" />}
            Continue with Google
          </Button>
          <Button
            className="signInWithGoogle__button"
            onClick={signInWithFacebook}
          >
           {darkMode ?  <img className="FacebookLogo" src={FbD} alt="" /> :  <img className="FacebookLogo" src={Fb} alt="" />}
            Continue with Facecook
          </Button>
          <p className="login__newUser">
            New to Hooklearn?
            <span onClick={() => setUser((prevState) => !prevState)}>
              {user ? "Sign Up" : "Sign In"}
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Auth;
