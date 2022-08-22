import * as api from "../api/index.js";
import {
  createComment,
  error,
  isloading,
  fetchcomments,
  // pushComment,
  pushReply,
  likeComt,
} from "../redux/comments";

export const fetchComments = (id) => async (dispatch) => {
  dispatch(isloading());
  try {
    const { data } = await api.fetchComments(id);

    dispatch(fetchcomments(data));
  } catch (err) {
    dispatch(error(err));
  }
};

export const addComment = (comment) => async (dispatch) => {
  try {
    const { data } = await api.addComment(comment);

    console.log(data);

    dispatch(createComment(data));
  } catch (error) {
    console.error(error);
  }
};

// export const addMorecomments = (id, post) => async (dispatch) => {
//   try {
//     const {data} = await api.pushComment(id, post);

//     dispatch(pushComment(data));
//   } catch (error) {
//     console.error(error);
//   }
// };

export const addReply = (id, reply) => async (dispatch) => {
  try {
    const { data } = await api.pushReply(id, reply);

    dispatch(pushReply(data));
  } catch (error) {
    console.error(error);
  }
};

export const likeComment = (id, commentId) => async (dispatch) => {
  console.log(id);
  try {
    const { data } = await api.likeComment(id, commentId);
    console.log(data);

    dispatch(likeComt(data));
  } catch (error) {
    console.error(error);
  }
};
