import { useState, useMemo } from "react";
import { Mic, Search } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import BottomNavigation from "../components/BottomNavigation";
import Appbar from "../components/Appbar";
import "../styles/Search.css";
import { useStateContex } from "../store/StateProvider";

function SearchPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const { transcript, listening } = useSpeechRecognition();
  const micColor = listening ? "error" : "default";

  const { darkMode } = useStateContex();

  const handleSearchTerm = (e) => {
    setSearchTerm(e.target.value);
  };

  useMemo(() => {
    setSearchTerm(transcript);
  }, [transcript]);

  //   "ANSWER LATER BUTTON ON QUE CARDS"

  return (
    <div className="searchPage">
      <Appbar />

      <div
        className={`searchPage__container ${
          darkMode && "searchPage__containerDark"
        }`}
      >
        <form className="searchPage__form">
          <input
            className=""
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                if (searchTerm === "j") setSearchTerm("");
                e.preventDefault();
              }
            }}
            onChange={handleSearchTerm}
          />
          <Search className="searchPage__searchIcon" />
        </form>
        {/* <p>{ transcript}</p> */}
        <div className="searchPage__buttons">
          {/* <IconButton>
						<ImageSearchOutlined className="searchPage__buttonsIcon" />
						<p>Search Image</p>
					</IconButton> */}
          <IconButton
            color={micColor}
            onClick={() => {
              SpeechRecognition.startListening({
                language: "en-US",
                continuous: false,
              });
            }}
          >
            <Mic className="searchPage__buttonsIcon" />
            {/* <p>Voice</p> */}
          </IconButton>
        </div>
      </div>
      <BottomNavigation />
    </div>
  );
}

export default SearchPage;
