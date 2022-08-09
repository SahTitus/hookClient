import axios from "axios";

const API = axios.create({ baseURL: "https://hookengine.vercel.app" })
// const linkUrl = "https://hooklearn.herokuapp.com/link"
// const url = "https://hooklearn.herokuapp.com";
// const url = "https://hookengine.vercel.app";
// const url = "http://localhost:5000"

API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
        req.headers.Authorization = `Bearer  + ${JSON.parse(localStorage.getItem('profile')).token}`;
    }

    return req;
})


export const fetchPosts = (page) => API.get(`/posts`);
export const fetchPost = (id) => API.get(`/posts/${id}`);
export const detectLink = (link) => API.post(`/link}`, link);
export const comment = (id, comment) => API.post(`/${id}`, comment);
export const createPost = (newPost) => API.post(`/posts`, newPost);
export const deletePost = (id) => API.delete(`/posts/${id}`);
export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost);
export const likePost = (id) => API.patch(`/posts/${id}/likePost`);

export const signIn = (formData) => API.post(`/user/signin`, formData);
export const signUp = (formData) => API.post(`/user/signup`, formData);
 