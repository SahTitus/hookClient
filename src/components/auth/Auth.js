import { Button } from "@mui/material";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Go from "../../images/Go.png";
import FbD from "../../images/FbD.png";
import Gd from "../../images/Gd.png";
import Fb from "../../images/Fb.jpg";
import Hook from "../../images/Hook.jpg";
import "../../styles/Login.css";
import { FacebookAuthProvider, signInWithPopup, GoogleAuthProvider } from "@firebase/auth";
import { auth } from "../../firebase";
import Input from "./Input";
import { useStateContex } from "../../store/StateProvider";
import { useDispatch } from "react-redux";
import {
	authData
} from "../../redux/auth";
import { signin, signup } from "../../actions/auth"

const initialState = { firstName: "", lastName: "", email: "", password: "", confirmPassword: "", };

function Auth() {
  const [showPassword, setShowPassword] = useState(false);
  const [user, setUser] = useState(false);
  const [formData, setFormData] = useState(initialState);

  const { darkMode } = useStateContex();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isSignup = true
  

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const toggleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const user = await signInWithPopup(auth, provider)
    const token = user._tokenResponse.idToken
    const result = user.user
    try {
    dispatch(authData({ result, token}))
      console.log(user)
      navigate(-1);
    } catch (error) {
      console.log(error)
    }
    
  };

  const signInWithFacebook = async () => {
      const provider = new FacebookAuthProvider();
      const user = await signInWithPopup(auth, provider)
      const token = user._tokenResponse.idToken
      const result = user.user
      try {
      dispatch(authData({ result, token}))
        console.log(user)
        navigate(-1);

    } catch (error) {
      console.log(error)
    }
    
  };

  // const handleSignIn = (provider: AuthProvider) =>{
  //   signInWithPopup(auth, provider).then((result) => {
  //     repeatAuth();
  //   }).catch((error) => {
  //     console.log(error);
  //     if (error.code === 'auth/account-exists-with-different-credential') {
  //       let pendingCred = error.credential;
  //       let email = error.customData.email;
    
  //       console.log(error.customData.email); // undefined
  //       fetchSignInMethodsForEmail(auth, email).then( (methods) => {
  //         console.log(methods);
  //         if (methods[0] === 'password') {
    
  //           var password = promptUserForPassword(); // TODO: implement promptUserForPassword.
    
  //           signInWithEmailAndPassword(auth, email, password!).then((result) => {
  //             return linkWithCredential(result.user, pendingCred);
  //           }).then(() => {
  //             repeatAuth();
  //           });
  //           return;
  //         }
  //         // TODO: implement getProviderForProviderId.
  //         var provider = getProviderForProviderId(methods[0]);
  //         signInWithPopup(auth, provider).then((result) => {
  //           repeatAuth();
  //         });
  //       }).catch((error) => {
  //         console.log(error);
  //       });
  //     }
  //   });

  const handleSubmit = (e) => {
    e.preventDefault();

if (!isSignup) {
dispatch(signup(formData, navigate))
} else {
  dispatch(signin(formData, navigate))
}


    setFormData({ ...formData, initialState: "" });
    console.log(formData);
  };

  return (
   <div className={`login ${darkMode && "loginDark"}`}>
      <div className="login__top">
        <Link to="/">
          <img className="hookLogo" src={Hook} alt="" />
        </Link>
      </div>
      <div className="login__containerTitle">
        <div className="login__flexTitle">
          <h2>{!user ? "Sign In" : "Sign Up"}</h2>
        </div>
      </div>
      <div className="login__container">
        <form className="login__form">
         {user && (
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
            // autoFocus={true}
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
            {!user ? "Sign In" : "Sign Up"}
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
            {user ? 'Already have an account?': 'New to Hooklearn?'}
            <span onClick={() => setUser((prevState) => !prevState)}>
              {user ? "Sign In" : "Sign Up"}
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Auth;
