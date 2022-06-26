import { Badge, IconButton, Dialog } from "@mui/material";
import "../styles/Appbar.css";
import { Link } from "react-router-dom";
import Hook from "../images/Hook.jpg";
import { AccountCircleOutlined, Close, AccountCircle, NotificationsOutlined } from "@mui/icons-material";
import { transition } from "../utils/transition";
import useToggle from "../utils/useToggle";
import Drawer from "./Drawer";
import ToggleMode from "./ToggleMode";
import { useStateContex } from "../store/StateProvider";

function Appbar() {
  const { value, toggleValue } = useToggle(false);
  const { darkMode } = useStateContex();

  return (
    <div className="appbar">
      <div className="appbar__header">
        <div className="appbar__headerLeft">
          <div className="appbar__headerLogo">
            {/* <h3>Hooklearn</h3> */}
            <Link to="/">
              <img className="logoImg" src={Hook} alt="" />
            </Link>
          </div>
        </div>
        <div className="appbar__headerRight">
          <IconButton id="appbar__headerRightBtn">
            <Badge badgeContent={0} color="secondary">
              <NotificationsOutlined
                className={`appbar__headerRightIcon ${
                  darkMode && "headerRightIconDark"
                }`}
              />
            </Badge>
          </IconButton>

          <IconButton id="appbar__headerRightBtn" onClick={toggleValue}>
            {darkMode ? (
              <AccountCircle
                className={`appbar__headerRightIcon ${
                  darkMode && "headerRightIconDark"
                }`}
              />
            ) : (
              <AccountCircleOutlined
                className={`appbar__headerRightIcon ${
                  darkMode && "headerRightIconDark"
                }`}
              />
            )}
          </IconButton>
        </div>
      </div>

      <Dialog
        fullScreen
        open={value}
        onClose={toggleValue}
        TransitionComponent={transition}
        // onClick={toggleValue}
      >
        <div className={`appbar__drawer ${darkMode && "appbar__drawerDark"}`}>
          <div className="appbar__drawerTop">
            <div className="appbarChild">
              <IconButton
                edge="end"
                color="inherit"
                aria-label="close"
                style={{ marginRight: "5px" }}
                onClick={toggleValue}
              >
                <Close className={`drawerClose ${ darkMode && "drawerCloseDark"}` } />
              </IconButton>
            </div>

            <p className="">
              <ToggleMode />
            </p>
          </div>

          <Drawer />
        </div>
      </Dialog>
    </div>
  );
}

export default Appbar;
