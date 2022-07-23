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
			state.posts = state.posts.filter((post) => post._id === action.payload._id ? action.payload : post );
		},
		comment: (state, action) => {
		 state.posts = [...state.posts,  {posts: state.posts.map((post) => {
			if (post._id === action.payload._id) return action.payload;
			return post;

		 } )}]
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
} = postsSlice.actions;
export default postsSlice.reducer;
