import axios from "axios";


// const linkUrl = "https://hooklearn.herokuapp.com/link"
// const url = "https://hooklearn.herokuapp.com";
const linkUrl = "https://hookengine.vercel.app/link"
const url = "https://hookengine.vercel.app";
// const url = "http://localhost:5000"
// const linkUrl = "http://localhost:5000/link"

export const fetchPosts = (page) => axios.get(`${url}/posts`);
export const fetchPost = (id) => axios.get(`${url}/posts/${id}`);
export const detectLink = (link) => axios.post(linkUrl, link);
export const comment = (id, comment) => axios.post(`${url}/${id}`, comment);
export const createPost = (newPost) => axios.post(`${url}/posts`, newPost);
export const deletePost = (id) => axios.delete(`${url}/posts/${id}`);
export const updatePost = (id, updatedPost) =>
	axios.patch(`${url}/${id}`, updatedPost);
 