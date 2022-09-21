import { configureStore } from "@reduxjs/toolkit";
import authorizeReducer from "./reducers/authorizeReducer";
import blogReducer from "./reducers/blogReducer";
import notificationReducer from "./reducers/notificationReducer";
import userReducer from "./reducers/userReducer";

const store = configureStore({
  reducer: {
    blog: blogReducer,
    notification: notificationReducer,
    authorize: authorizeReducer,
    users: userReducer,
  },
});

console.log(store.getState());
export default store;
