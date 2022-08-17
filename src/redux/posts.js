import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	isLoading: false,
	posts: [],
	post: {},
	error: [],
	link: {},

};

export const postsSlice = createSlice({
	name: "posts",
	initialState,
	reducers: {
		fetchPostsSuccess: (state, action) => {
			state.posts = action.payload;
			state.isLoading = false;
		},
		fetchPostSuccess: (state, action) => {
			state.post = action.payload;
			state.isLoading = false;
		},
		fetchPostsIsloading: (state) => {
			state.isLoading = true;
		},
		fetchPostsError: (state, action) => {
			state.isLoading = false;
			state.error = action.payload;
		},
		detectLink: (state, action) => {
			state.link =  action.payload;
		},
		addPost: (state, action) => {
			state.posts = [...state.posts, action.payload];
		},
		deletePost: (state, action) => {
			state.posts = state.posts.filter((post) => post._id !== action.payload);
		},
		update: (state, action) => {
			state.posts = state.posts.map((post) => post._id === action.payload._id ? action.payload : post );
		},
		like: (state, action) => {
			state.posts = state.posts.map((post) => post._id === action.payload._id ? action.payload : post );
		},
		repost: (state, action) => {
			state.posts = state.posts.map((post) => post._id === action.payload._id ? action.payload : post );
		},
		commentPost: (state, action) => {
			state.posts = state.posts.map((post) => post._id === action.payload._id ? action.payload : post );
		}
	},
});

export const {
	fetchPostsError,
	fetchPostsIsloading,
	fetchPostsSuccess,
	fetchPostSuccess,
	addPost,
	deletePost,
	update,
	detectLink,
	like,
	repost,
	commentPost,
} = postsSlice.actions;
export default postsSlice.reducer;
