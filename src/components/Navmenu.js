
import {
  Bookmark, GroupAdd, Help,
 Person, Policy,  Settings
} from "@mui/icons-material";
import { Link } from 'react-router-dom';
import '../styles/Navmenu.css'

export default function Navmenu() {
  

  return (
    <div className="navmenu">
      <Link to="/profile">
      <div className="navmenu__option">
        <Person className="navmenu__icon" />
        <p >Profile</p>   
      </div>
      </Link>
      <div className="navmenu__option">
        <Bookmark className="navmenu__icon" />
        <p>Saved</p>
      </div>
      <div className="navmenu__option">
        <GroupAdd className="navmenu__icon" />
        <p>Invite a friend</p>
      </div>
      <div className="navmenu__option">
        <Policy className="navmenu__icon" />
        <p>Privacy Policy</p>
      </div>
      <div className="navmenu__option">
        <Help className="navmenu__icon" />
        <p>Help & Feedback</p>
      </div>
      <div className="navmenu__option">
        <Settings className="navmenu__icon" />
        <p>Settings</p>
      </div>
    </div>
  );
}