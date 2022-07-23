import "../styles/Chats.css";
import { Search } from "@mui/icons-material";
import Chat1 from "../pages/Chat1";
import Health from "../images/Health.jpg";
import BottomNavigation from "../components/BottomNavigation";
import Appbar from "../components/Appbar";
import { useStateContex } from "../store/StateProvider";

function Chats() {
  const { darkMode } = useStateContex();

  return (
    <div className={`chats ${darkMode && "chatsDark"}`}>
      <Appbar />

      <div className={`chats__body ${darkMode && "chatsDark"}`}>
        <div className="chats__search">
          <div className="chats__searchContainer">
            <Search className="searchIcon" />
            <input type="text" placeholder="Search friends..." />
          </div>
        </div>
        <div className="chats__chat">
          <Chat1
            image={Health}
            username="PEHJOS"
            message="send me the hacks gh   vdsvsdvdv c d9dvd9 dv dv9dvhv hff rufhr7r rvrvrvrv vrvribb b9rr brb9rubrb  vdvhdivh vvdv vdvdv vdv9dvudv v wefof ff fefhr"
            timestamp="8:00 pm"
          />
          <Chat1
            image={Health}
            username="Thamosin"
            message="It was a lie 😜"
            timestamp="7:58 pm"
          />
          <Chat1
            image={Health}
            username="HOOKWALL"
            message="i will be dispatching the package soon"
            timestamp="7:48 pm"
          />
          <Chat1
            image={Health}
            username="Sah Titus"
            message="Thank you Sir 👍"
            timestamp="7:46 pm"
          />
          <Chat1
            image={Health}
            username="Van Dash"
            message="Just keep calm for 5 minutes 🙏 "
            timestamp="7:20 pm"
          />
          <Chat1
            image={Health}
            username="Sah Titus"
            message="Thank you Sir 👍"
            timestamp="7:46 pm"
          />
          <Chat1
            image={Health}
            username="Van Dash"
            message="Just keep calm for 5 minutes 🙏 "
            timestamp="7:20 pm"
          />
        </div>
      </div>
      <BottomNavigation />
    </div>
  );
}

export default Chats;
