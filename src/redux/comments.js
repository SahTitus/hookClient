import { createSlice } from "@reduxjs/toolkit";
import { comments } from "./posts";

const initialState = {
  isLoading: false,
  comments: [],
  error: [],
  postId: "",
  commentsId: "",
};

export const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    fetchcomments: (state, action) => {
      state.comments = action.payload.comments.map((comment) => comment);
      state.isLoading = false;
      state.commentsId = action.payload._id;
      state.postId = action.payload.postId;
    },
    isloading: (state) => {
      state.isLoading = true;
    },
    error: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    createComment: (state, action) => {
      state.comments = action.payload.comments;
      state.commentsId = action.payload._id;
      state.postId = action.payload.postId;
    },
    deleteComment: (state, action) => {
      state.comments = state.comments.filter(
        (post) => post._id !== action.payload
      );
    },
		//Edit comments
    // pushComment: (state, action) => {
    //   state.comments = action.payload.comments;
    //   state.commentsId = action.payload._id;
    //   state.postId = action.payload.postId;
    //   console.log(action.payload);
    // },

    pushReply: (state, action) => {
      state.comments = action.payload.comments;
      state.commentsId = action.payload._id;
      state.postId = action.payload.postId;
    },
    likeComt: (state, action) => {
      console.log(state.commentsId);
      console.log();
      state.comments = state.comments.map((comment) =>
        action.payload.comments.map((com) => com.id === comment.id)
          ? action.payload.comments.find((com) => comment.id === com.id)
          : comment
      );
      state.commentsId = action.payload._id;
      state.postId = action.payload.postId;
      console.log(state.comments);
    },
  },
});

export const {
  error,
  isloading,
  fetchcomments,
  deletePost,
//   pushComment,
  detectLink,
  likeComt,
  createComment,
  pushReply,
} = commentsSlice.actions;
export default commentsSlice.reducer;
