import {
  AddCircle,
  FilterAltOutlined,
  GroupsOutlined,
  MarkEmailUnreadOutlined,
  PinDropOutlined,
  Explore
} from "@mui/icons-material";
import React from "react";
import { Link } from "react-router-dom";
import "../styles/Questions.css";
import "../styles/Halls.css";
import QuestionCard from "../components/QuestionCard";
import Food from "../images/Food.jpg";
import BottomNavigation from "../components/BottomNavigation";
import Appbar from "../components/Appbar";
import { useStateContex } from "../store/StateProvider";

function Halls() {
  const { darkMode } = useStateContex();

  return (
    <div className={`categories ${darkMode && "categoriesDark"}`}>
      <Appbar />

      <div className="categories__header">
        <h3>Halls</h3>
        <div className="categories__headerButtons">
          <button>
            <Explore className={`categories__headerButtonsIcon ${darkMode && "categories__headerButtonsIconDark" }`} />
           <p > Discover</p>
          </button>
          <Link to="/createGroup">
            <button>
              <AddCircle className={`categories__headerButtonsIcon ${darkMode && "categories__headerButtonsIconDark" }`}/>
              <p>Create</p>
            </button>
          </Link>
        </div>
      </div>

      <div className="halls__board">
        <div className="halls__boardBox">
          <Link to="/myhalls">
            <div className="halls__boardBoxOpt">
              <GroupsOutlined className="halls__boardBoxOptIcon" />
              <p>My Halls</p>
            </div>
          </Link>
          <div className="halls__boardBoxOpt">
            <PinDropOutlined className="halls__boardBoxOptIcon" />
            <p>Pin</p>
          </div>
          <div className="halls__boardBoxOpt">
            <FilterAltOutlined className="halls__boardBoxOptIcon" />
            <p>Filter</p>
          </div>
          <div className="halls__boardBoxOpt">
            <MarkEmailUnreadOutlined className="halls__boardBoxOptIcon" />
            <p>Invitations</p>
          </div>
        </div>
      </div>

      <div className="halls__posts">
        <QuestionCard
          answersBox
          answer
          noOfAnswer={2}
          noOfShare={3}
          noOfFollow={6}
          question="Why are sex-linked diseases more
                    prevalent in males than in females"
          groupName="Genetics"
          timestamp="2 min ago"
          image={Food}
        />
       
      </div>

      <BottomNavigation />
    </div>
  );
}

export default Halls;
