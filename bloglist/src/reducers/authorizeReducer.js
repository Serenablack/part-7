import blogService from "../services/blogs";
import loginService from "../services/login";
import { blogNotific } from "../reducers/notificationReducer";

const authorizeReducer = (state = null, action) => {
  switch (action.type) {
    case "INIT_USER":
      return action.data;
    case "LOG_IN":
      console.log("here");
      return action.data;
    case "LOG_OUT":
      return action.data;
    default:
      return state;
  }
};

export const initializeUser = () => {
  const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
  if (loggedUserJSON) {
    const user = JSON.parse(loggedUserJSON);
    blogService.setToken(user.token);
    return {
      type: "INIT_USER",
      data: user,
    };
  }
  return {
    type: "INIT_USER",
    data: null,
  };
};

export const login = (username, password) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login({
        username,
        password,
      });
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      blogService.setToken(user.token);

      dispatch({
        type: "LOG_IN",
        data: user,
      });
    } catch (error) {
      dispatch(blogNotific(error.response.data.error, "error", 3000));
    }
  };
};

export const logout = () => {
  return async (dispatch) => {
    window.localStorage.removeItem("loggedBlogappUser");
    dispatch({
      type: "LOG_OUT",
      data: null,
    });
  };
};
export default authorizeReducer;
