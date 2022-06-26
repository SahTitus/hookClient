import * as api from "../api/index.js";
import {
	fetchPostsIsloading,
	fetchPostsSuccess,
	fetchPostsError,
	addPost,
	update,
	deletePost,
} from "../redux/posts";

export const fetchPosts = () => async (dispatch) => {
	dispatch(fetchPostsIsloading());
	try {
		const { data } = await api.fetchPosts();

		console.log(data);

		dispatch(fetchPostsSuccess(data));
	} catch (error) {
		dispatch(fetchPostsError(error));
	}
};

export const createPost = (post) => async (dispatch) => {
	try {
		const { data } = await api.createPost(post);
		dispatch(addPost(data));
	} catch (error) {
		console.error(error);
	}
};

export const updatePost = (id, post) => async (dispatch) => {
	try {
		const updatedPost = await api.updatePost(id, post);

		dispatch(update(updatedPost));
	} catch (error) {
		console.error(error);
	}
};

export const deletePst = (id) => async (dispatch) => {
	try {
		await api.deletePost(id);

		dispatch(deletePost(id));
	} catch (error) {
		console.error(error);
	}
};

