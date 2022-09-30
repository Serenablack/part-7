import { createSlice } from "@reduxjs/toolkit";
import { blogNotific } from "../reducers/notificationReducer";
import blogService from "../services/blogs";

const blogSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    initBlog(state, action) {
      return action.payload;
    },

    incLike(state, action) {
      const id = action.payload;
      const updatedObj = state.find((Obj) => Obj.id === id);

      const blog = {
        ...updatedObj,
        likes: updatedObj.likes + 1,
      };
      return state.map((b) => (b.id !== id ? b : blog));
    },
    createBlog(state, action) {
      const content = action.payload;

      return [...state, content];
    },
    delBlog(state, action) {
      return state.filter((blog) => blog.id !== action.payload);
    },
    appendBlogs(state, action) {
      state.push(action.payload);
    },
    setBlogs(state, action) {
      return action.payload;
    },
  },
});
export const { initBlog, incLike, delBlog, appendBlogs, setBlogs } =
  blogSlice.actions;
export default blogSlice.reducer;

export const initializeBlog = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();

    dispatch(initBlog(blogs));
  };
};

export const createBlog = (content) => {
  return async (dispatch) => {
    try {
      const newBlog = await blogService.create(content);

      dispatch(appendBlogs(newBlog.data));
    } catch (error) {
      dispatch(blogNotific(error.response.data.error, "error", 3000));
    }
  };
};

export const increaseLike = (blogtoUpdate) => {
  return async (dispatch) => {
    // eslint-disable-next-line no-unused-vars
    const blog = dispatch(incLike(blogtoUpdate.id));

    // eslint-disable-next-line no-unused-vars
    const updatedBlog = await blogService.update({
      ...blogtoUpdate,
      likes: blogtoUpdate.likes + 1,
    });
    // dispatch(setblogs(updatedBlog));
  };
};

export const deleteBlog = (blogtoDelete) => {
  return async (dispatch) => {
    dispatch(delBlog(blogtoDelete.id));

    // eslint-disable-next-line no-unused-vars
    const deletedBlog = await blogService.remove(blogtoDelete);
    // dispatch(setblogs(updatedBlog));
  };
};
