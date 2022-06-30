import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	isLoading: false,
	posts: [],
	error: [],
	image: null,
};

export const postsSlice = createSlice({
	name: "posts",
	initialState,
	reducers: {
		fetchPostsSuccess: (state, action) => {
			state.posts = action.payload;
			state.isLoading = false;
		},
		fetchPostsIsloading: (state) => {
			state.isLoading = true;
		},
		fetchPostsError: (state, action) => {
			state.isLoading = false;
			state.error = action.payload;
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
		choseImg: (state, action) => {
			state.image = action.image
			console.log(state.image)
		}
	},
});

export const {
	fetchPostsError,
	fetchPostsIsloading,
	fetchPostsSuccess,
	addPost,
	deletePost,
	update,
} = postsSlice.actions;
export default postsSlice.reducer;
