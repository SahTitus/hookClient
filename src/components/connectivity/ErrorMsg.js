import React from "react";
import { useStateContex } from "../../store/StateProvider";
import style from "../../styles/ErrorToast.module.css";
import Error from "../../images/Error.gif";
// import ErrorDark from "../../images/ErrorDark.gif";

function ErrorMsg({ error }) {
  const { darkMode } = useStateContex();

  return (
    <div className={`${style.errorMsg} ${darkMode && style.errorMsgDark}`}>
      {/* {darkMode ? <img src={ErrorDark} alt="" /> : <img src={Error} alt="" />} */}
      <div className={style.errorInfo}>
        <h4>Something went wrong</h4>
        <p>Check your internet connection and try again</p>
        <button>Try again</button>
      </div>
    </div>
  );
}

export default ErrorMsg;
