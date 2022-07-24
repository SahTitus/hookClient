import { Avatar } from "@mui/material";
import {
  KeyboardArrowRight,
  BookmarksOutlined,
  HelpOutline,
  SettingsOutlined,
} from "@mui/icons-material";
import React from "react";
import style from "../styles/Drawer.module.css";
import { Link} from "react-router-dom";
import { useStateContex } from "../store/StateProvider";
import { useDispatch } from "react-redux";
import {
	logout
} from "../redux/auth";
// import ToggleMode from "./ToggleMode"

function Drawer({ closeDrawer}) {
  const { darkMode } = useStateContex();
  const dispatch = useDispatch();
  // const navigate = useNavigate();
  // const user=useState(JSON.parse(localStorage.getItem("profile")))

  const logOut = () => {
    dispatch(logout())
    window.location.reload(true)
    closeDrawer()
    // navigate('/')
  }

  return (
    <div className={`${style.drawer} ${darkMode && style.drawerDark}`}>
      <Link to="/profile">
        <div className={style.profile}>
          <div className={style.profile__left}>
            <Avatar className={style.profile__avatar} />
            <div className={style.profile__info}>
              <h4 className={style.username}>Sah Titus Samuel</h4>
              <p>View profile</p>
            </div>
          </div>
          <KeyboardArrowRight
            style={{ marginRight: "18px" }}
            className={style.menu__itemIcon}
          />
        </div>
      </Link>

      <div className={style.drawer__menu}>
        <div className={style.menu__item}>
          <BookmarksOutlined className={style.menu__itemIcon} />
          <p className={style.menu__itemLabel}>Saved</p>
        </div>

        <div className={style.menu__item}>
          <HelpOutline className={style.menu__itemIcon} />
          <p className={style.menu__itemLabel}>Help and feedback</p>
        </div>
        <div className={style.menu__item}>
          <SettingsOutlined className={style.menu__itemIcon} />
          <p className={style.menu__itemLabel}>Settings</p>
        </div>
        <hr className={style.drawer__divider} />
      </div>
      <p style={{ bgcolor: 'red'}} onClick={logOut}>LogOut</p>
      <textarea style={{height: '100px', width: "200px"}}/>
  
              placeholder="Leave a comment here..."

              type="text"

              multiline="multiline"
            />
    </div>
  );
}

export default Drawer;
