import React, { useState, forwardRef } from "react";
import "../styles/GroupPage.css";
import { ArrowBack, MoreVert, Notifications, Search } from "@mui/icons-material";
import Food from "../images/Food.jpg";
import { Tab, Tabs, Slide } from "@mui/material";
import { makeStyles } from "@mui/styles";
import SwipeableViews from "react-swipeable-views";
import useHideOnScroll from "../utils/HideOnScroll";
import { useNavigate } from "react-router-dom";
import QuestionCard from "../components/QuestionCard";
import PostCard from "../components/Post/PostCard";
import Toys from "../images/Toys.jpg";
import Hook from "../images/Hook.jpg";
import Sam1 from "../images/Sam1.jpg";

const Transition = forwardRef(function Transition(props, ref) {
	return <Slide direction="left" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) => ({
	tab: {
		marginLeft: "1px",
	},
	tabL: {
		marginLeft: "10px",
	},
	/// show footer at the top
	showAtTop: {
		position: "",
		top: "",
		zIndex: "10",
		display: "flex",
		justifyContent: "space-between",
		width: "100%",
		boxShadow: "0px 5px 3px -5px rgba(0, 0, 0, 0.3)",
		backgroundColor: "white",
	},
}));

function GroupPage() {
	const navigate = useNavigate();
	const classes = useStyles();
	const [value, setValue] = useState(0);

	const { show } = useHideOnScroll();

	const handleChange = (e, newValue) => {
		setValue(newValue);
	};

	const handleChangeIndex = (index) => {
		setValue(index);
	};

	return (
		<div TransitionComponent={Transition} className="groupPage">
			<div className={`groupPage__header ${show && "searchShowAtTop"}`}>
				<ArrowBack
					onClick={() => navigate(-1)}
					className="groupPage__headerIcon"
				/>
				<form>
					<Search className="groupPage__headerSearchIcon" />
					<input
						className="groupPage__headerInput"
						type="text"
						placeholder="Food Planning"
					/>
				</form>
				<MoreVert className="groupPage__headerIcon" />
			</div>

			<div className={`groupPage__info ${show && "infoShowAtTop"}`}>
				<div className="groupPage__infoTop">
					<img src={Food} alt='l' />
					<div className="groupPage__infoTopRight">
						<Notifications className="groupPage__infoTopRightIcon" />
						<p>Joined</p>
					</div>
				</div>

				<h4 className="groupPage__infoTitle">Food Planning</h4>
				<span className="groupPage__infoMembers">
					603.K members 🏵️ 30 post a day
				</span>
				<p className="groupPage__infoDesc">
					A group for learning and improving an in-depth knowledge on food
					planning{" "}
				</p>
			</div>

			<div className="groupPage__tabs">
				<Tabs
					value={value}
					onChange={handleChange}
					indicatorColor="primary"
					textColor="primary"
					className={`groupPage__tabs1 ${show && "TabsShowAtTop"}`}
					variant="fullWidth"
					selectionFollowsFocus>
					<Tab label="Posts" value={0} className={classes.tab} />
					<Tab label="My Posts" value={1} className={classes.tab} />
					<Tab label="About" value={2} className={classes.tab} />
				</Tabs>
				<SwipeableViews index={value} onChangeIndex={handleChangeIndex}>
					<div className={`groupPage__posts ${show && "postsDivShowAtTop"}`}>
					<PostCard 
                image={Hook}
                link=""
                text=""
                username="Clinton"
                likes={0}
                dislikes={0}
                group="Tanhans"
                timestamp="1 min"
                noOfComments={0}
                noOfShares={0}
                description="Hooklearn is on fire 🔥"
                />
        <PostCard 
                image={Toys}
                link=""
                text=""
                username="Clinton"
                likes={0}
                dislikes={0}
                group="Tanhans"
                timestamp="1 min"
                noOfComments={0}
                noOfShares={0}
                description="Foods are pretty much delicious"
                />
        <PostCard 
                image={Sam1}
                link=""
                text=""
                username="Clinton"
                likes={0}
                dislikes={0}
                group="Tanhans"
                timestamp="1 min"
                noOfComments={0}
                noOfShares={0}
                description = "Yoo man "
                />
        <PostCard 
                image=''
                link=""
                text="We will be dispatching some of the products today"
                username="Clinton"
                likes={0}
                dislikes={0}
                group="Tanhans"
                timestamp="1 min"
                noOfComments={0}
                noOfShares={0}
                description = ""
                />
        <PostCard 
                image={Food}
                link=""
                text=""
                username="React Lee"
                likes={0}
                dislikes={0}
                group="Tanhans"
                timestamp="1 min"
                noOfComments={0}
                noOfShares={0}
                description="My favorite foods are pretty much delicious"
                />
        
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
					<div className={`groupPage__posts ${show && "postsDivShowAtTop"}`}>
						<h3>No data is found</h3>
					</div>
					<div className={`groupPage__posts ${show && "postsDivShowAtTop"}`}>
						<h3>No data is found</h3>
					</div>
				</SwipeableViews>
			</div>
		</div>
	);
}

export default GroupPage;
