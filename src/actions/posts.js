import * as api from "../api/index.js";
import {
  fetchPostsIsloading,
  fetchPostsSuccess,
  fetchPostSuccess,
  fetchPostsError,
  addPost,
  update,
  deletePost,
  detectLink,
  like,
  repost
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

export const fetchPost = (id) => async (dispatch) => {
  dispatch(fetchPostsIsloading());
  try {
    const { data } = await api.fetchPost(id);

    console.log(data);

    dispatch(fetchPostSuccess(data));
  } catch (error) {
    dispatch(fetchPostsError(error));
  }
};

export const sendLink = (link) => async (dispatch) => {
  try {
    const { data } = await api.detectLink(link);
    console.log(data);
    dispatch(detectLink(data));
  } catch (error) {
    console.error(error);
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

export const likePost = (id) => async (dispatch) => {
  console.log(id);
  try {
    const { data } = await api.likePost(id);
    console.log(data);

    dispatch(like(data));
  } catch (error) {
    console.error(error);
  }
};

export const rePost = (id) => async (dispatch) => {
  console.log(id);
  try {
    const { data } = await api.rePost(id);
    console.log(data);

    dispatch(repost(data));
  } catch (error) {
    console.error(error);
  }
};

// Check this 
export const commentPst = (id) => async (dispatch) => {
  console.log(id);
  try {
    const { data } = await api.commentPost(id);
    console.log(data);

    //here
    dispatch(like(data));
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
