import { AddCircle, Explore } from "@mui/icons-material";
import React from 'react'
import '../styles/Categories.css'
import Bu from '../images/Bu.jpg'
import Food from '../images/Food.jpg'
import Health from '../images/Health.jpg'
import Parenting from '../images/Parenting.jpg'
import Cleaning from '../images/Cleaning.jpg'
import GroupCard from '../components/GroupCard'
import GroupRow from '../components/GroupRow'
import { Link } from 'react-router-dom'
import Appbar from '../components/Appbar'
import BottomNavigation from "../components/BottomNavigation";

function Myhalls() {
    return (
			<div className="categories">
				<Appbar /> 
				<div className="categories__header">
					<h3>My Halls</h3>
					<div className="categories__headerButtons">
						<button>
							<Explore className="categories__headerButtonsIcon" />
							<p>Discover</p>
						</button>
						<Link to="/createGroup">
							<button>
								<AddCircle className="categories__headerButtonsIcon" />
								<p>Create</p>
							</button>
						</Link>
					</div>
				</div>

				<div className="categories__container">
					<Link to="/groupPage">
						<GroupRow image={Bu} title="Math Gurus" />
					</Link>
					<GroupRow image={Food} title="Food and Nutrition" />
					<GroupRow image={Parenting} title="Parenting" />
					<GroupRow image={Health} title="Health" />
				</div>
				<div className="categories__recommended">
					<div className="categories__recommendedTop">
						<h3>Popular</h3>
						<p>View all</p>
					</div>
					<div className="categories__recommendedScroll">
						<GroupCard
							image={Cleaning}
							groupName="Sanitation"
							description="Disclosure the interesting hacks of genetics in humanity"
						/>
						<GroupCard
							image={Food}
							groupName="Genetics"
							description="Disclosure the interesting hacks of genetics in humanity"
						/>
						<GroupCard
							image={Parenting}
							groupName="Genetics"
							description="Disclosure the interesting hacks of genetics in humanity"
						/>
						<GroupCard
							image={Health}
							groupName="Genetics"
							description="Disclosure the interesting hacks of genetics in humanity"
						/>
					</div>
					<div className="categories__recommendedTop">
						<h3>Health </h3>
						<p>View all</p>
					</div>
					<div className="categories__recommendedScroll">
						<GroupCard
							image={Health}
							groupName="Genetics"
							description="Disclosure the interesting hacks of genetics in humanity"
						/>
						<GroupCard
							image={Parenting}
							groupName="Genetics"
							description="Disclosure the interesting hacks of genetics in humanity"
						/>
						<GroupCard
							image={Food}
							groupName="Genetics"
							description="Disclosure the interesting hacks of genetics in humanity"
						/>
						<GroupCard
							image={Cleaning}
							groupName="Sanitation"
							description="Disclosure the interesting hacks of genetics in humanity"
						/>
					</div>
				</div>
				<BottomNavigation />	
			</div>
		);
}

export default Myhalls
