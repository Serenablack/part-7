import { createSlice } from "@reduxjs/toolkit";
import commentService from "../services/comments";
const commentSlice = createSlice({
  name: "comment",
  initialState: [],
  reducers: {
    commentInit(state, action) {
      return action.payload;
    },

    appendComments(state, action) {
      state.push(action.payload);
    },
  },
});

export const { commentInit, appendComments } = commentSlice.actions;
export const initComment = (id) => {
  return async (dispatch) => {
    const comments = await commentService.getAll(id);
    dispatch(commentInit(comments));
  };
};
export default commentSlice.reducer;

export const createComment = (content, id) => {
  return async (dispatch) => {
    const addedComment = await commentService.create(content, id);

    dispatch(appendComments(addedComment));
  };
};
