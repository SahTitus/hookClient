import {
	Avatar,
	List,
	Box,
	ListItemText,
	ListItem,
	ListItemIcon,
	IconButton,
	Drawer,
} from "@mui/material";
import React, { useState } from "react";
import "../styles/Post.css";
import {
	ThumbDownOutlined,
	ThumbUpOutlined,
	Clear,
	BookmarkBorder,
	VisibilityOutlined,
	ReportOutlined,
	BlockOutlined,
	LinkOutlined,
	MoreVert,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import { faComment } from "@fortawesome/free-regular-svg-icons";
import { faShare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";
import { useDispatch } from "react-redux";
import { deletePst, updatePost } from "../../actions/posts";

function Post({
	id,
	username,
	postDesc,
	link,
	title,
	noOfShares,
	noOfComments,
	group,
	likes,
	dislikes,
	image,
	timestamp,
}) {
	const [state, setState] = useState({
		bottom: false,
	});

	const dispatch = useDispatch();

	const toggleDrawer = (anchor, open) => (event) => {

		setState({ ...state, [anchor]: open });
	};

	const list = (anchor) => (
		<Box
			sx={{ width: anchor === "bottom" ? "auto" : 250 }}
			role="presentation"
			onClick={toggleDrawer(anchor, false)}
			onKeyDown={toggleDrawer(anchor, false)}>
			<List>
				{[
					"Award details",
					"Hide post",
					"Save",
					"Follow",
					"Report",
					"Block account",
					"Copy link",
				].map((text, index) => (
					<ListItem button key={text}>
						<ListItemIcon>
							{index === 0 ? "🎖️" : null}
							{index === 1 ? <Clear /> : null}
							{index === 2 ? <BookmarkBorder /> : null}
							{index === 3 ? <VisibilityOutlined /> : null}
							{index === 4 ? <ReportOutlined /> : null}
							{index === 5 ? <BlockOutlined /> : null}
							{index === 6 ? <LinkOutlined /> : null}
						</ListItemIcon>
						<ListItemText primary={text} />
					</ListItem>
				))}
			</List>
		</Box>
	);

	return (
		<>
			{
				<div className="post">
					<div className="post__top">
						<div className="post__topHeader">
							<div className="post__topLeft">
								<Link to="profile">
									<Avatar src={image} />
								</Link>
								<div className="post__topLeftt">
									<div className="post__topLeftText">
										<Link to="profile">
											<p>
												{username} <span className="in">in</span> {group}
											</p>
										</Link>
										<span>{moment(timestamp).fromNow()} 🌀</span>
									</div>
								</div>
							</div>
							<div className="post__topRight">
								<IconButton onClick={toggleDrawer("bottom", true)}>
									<MoreVert />
								</IconButton>
							</div>
						</div>
						<div className="post__topTitle">
							<p>{title}</p>
						</div>
					</div>
					<div className="post__middle">
						{image && <img className="post__image" src={image} alt="" />}
						{link && (
							<a href={link}>
								<p className="link">{link}</p>
							</a>
						)}
						{postDesc && <h4>{postDesc}</h4>}
					</div>

					<div className="post__footer">
						<div className={`post__footerOption ${"post__footerLikes"}`}>
							{dislikes === 0 && likes === 0 ? (
								<div className="post__footerOptionVote">
									<div className={`post__footerOption ${"post__footerLikes"}`}>
										<ThumbUpOutlined className="voteUp" />
										<ThumbDownOutlined className="voteDown" />
									</div>
									<p className="post__vote">Vote</p>
								</div>
							) : (
								<div className="post__footerOptionVote1">
									<div className={`post__footerOption ${"post__footerLikes1"}`}>
										<ThumbUpOutlined className="voteUp" />
										{likes === 0 ? null : <p>{likes}</p>}
									</div>
									<div className={`post__footerOption ${"post__footerLikes1"}`}>
										<ThumbDownOutlined className="voteDown" />
										{dislikes === 0 ? null : <p>{dislikes}</p>}
									</div>
								</div>
							)}
						</div>

						<div className="post__footerOption" onClick={() => dispatch(deletePst(id))}>
							<FontAwesomeIcon
								icon={faComment}
								className="post__footerOptionIcon"
							/>
							{noOfComments === 0 ? <p>Comment</p> : <p>{noOfComments}</p>}
						</div>
						<div className="post__footerOption" onClick={ () => dispatch(updatePost(id, ))}>
							<FontAwesomeIcon
								icon={faShare}
								className="post__footerOptionIcon"
							/>
							{noOfShares === 0 ? <p>Share</p> : <p>{noOfShares}</p>}
						</div>
						{/* <div className="post__footerOption">
							<Redeem className="post__footerOptionIcon" />
							<p>Reward</p>
						</div> */}
					</div>

					<Drawer
						anchor="bottom"
						open={state.bottom}
						onClose={toggleDrawer("bottom", false)}
						onOpen={toggleDrawer("bottom", true)}>
						{list("bottom")}
					</Drawer>
				</div>
			}
		</>
	);
}

export default Post;
