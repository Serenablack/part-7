import { createSlice } from "@reduxjs/toolkit";
const notificationSlice = createSlice({
  name: "notification",
  initialState: null,
  reducers: {
    blogMessage(state, action) {
      return action.payload;
    },

    interval(state, action) {
      return action.payload;
    },
  },
});

export const { blogMessage, interval } = notificationSlice.actions;
export default notificationSlice.reducer;

export const blogNotific = (message, type, time) => {
  return async (dispatch) => {
    dispatch(blogMessage({ message, type }));

    setTimeout(() => dispatch(interval(null)), time);
  };
};
