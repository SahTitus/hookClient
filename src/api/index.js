import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" });
// const linkUrl = "https://hooklearn.herokuapp.com/link"
// const url = "https://hooklearn.herokuapp.com";
// const url = "https://hookengine.vercel.app";
// const url = "http://localhost:5000"
// "https://hookengine.herokuapp.com"

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }

  return req;
});

export const fetchPosts = (page) => API.get(`/posts`);
export const fetchComments = (id) => API.get(`/comments/${id}`);
export const fetchPost = (id) => API.get(`/posts/${id}`);
export const detectLink = (link) => API.post(`/link}`, link);
export const addComment = (comment) => API.post(`/comments`, comment);
export const createPost = (newPost) => API.post(`/posts`, newPost);
export const deletePost = (id) => API.delete(`/posts/${id}`);
export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost);
export const pushComment = (id, updatedComment) => API.patch(`/comments/${id}/more`, updatedComment);
export const pushReply = (id, reply) => API.patch(`/comments/${id}/reply`, reply);
export const likePost = (id) => API.patch(`/posts/${id}/likePost`);
export const likeComment = (id, commentId) => API.patch(`/comments/${id}/likeComment`, commentId);
export const commentPost = (id) => API.patch(`/posts/${id}/commentPost`);
export const rePost = (id) => API.patch(`/posts/${id}/rePost`);

export const signIn = (formData) => API.post(`/user/signin`, formData);
export const signUp = (formData) => API.post(`/user/signup`, formData);
