import React from "react";
import { useStateContex } from "../../store/StateProvider";
import style from "../../styles/ErrorToast.module.css";
import Offline from '../../images/Offline.png'
import { WifiOff } from "react-bootstrap-icons";

function OfflineMsg({ error, online, offline }) {
  const { darkMode } = useStateContex();

  return (
    <div className={`${style.offlineMsg} ${darkMode && style.offlineMsgDark}`}>

     { offline && <div className={style.toastTop}>
        <div className={style.status}>
          <WifiOff  className={style.statusIcon}/>
        </div>

        <div className={style.toastInfo}>
          <h3>You're offline</h3>
          <p>Check your Internet connection and try again</p>
        </div>
      </div>
     }



      <div className={style.toastBtm}>
        <button>
          Try again
        </button>
      </div>
    </div>
  );
}

export default OfflineMsg;
