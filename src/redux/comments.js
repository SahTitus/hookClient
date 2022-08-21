import { createSlice } from "@reduxjs/toolkit";
import { comments } from "./posts";

const initialState = {
	isLoading: false,
	comments: [],
	error: [],
	postId: '',
	commentsId: ''

};

export const commentsSlice = createSlice({
	name: "comments",
	initialState,
	reducers: {
		fetchcomments: (state, action) => {
			state.comments = action.payload.comments.map(comment => comment);
			state.isLoading = false;
			state.commentsId = action.payload._id;
			state.postId =  action.payload.postId;
		},
		isloading: (state) => {
			state.isLoading = true;
		},
		error: (state, action) => {
			state.isLoading = false;
			state.error = action.payload;
		},
		createComment: (state, action) => {
			state.comments = action.payload.comments
			state.commentsId = action.payload._id;
			state.postId =  action.payload.postId;
		},
		deleteComment: (state, action) => {
			state.comments = state.comments.filter((post) => post._id !== action.payload);
		},
		pushComment: (state, action) => {
			state.comments =  action.payload.comments
			state.commentsId = action.payload._id;
			state.postId =  action.payload.postId;
		},
		pushReply: (state, action) => {
			state.comments =  action.payload.comments
			state.commentsId = action.payload._id;
			state.postId =  action.payload.postId;
		},
		likeComment: (state, action) => {
			state.comments = state.comments.map((post) => post._id === action.payload._id ? action.payload : post );
		},
	}
});

export const {
	error,
	isloading,
	fetchcomments,
	deletePost,
	pushComment,
	detectLink,
	like,
	createComment,
	pushReply
} = commentsSlice.actions;
export default commentsSlice.reducer;
