import { configureStore } from "@reduxjs/toolkit";
import blogReducer from "./reducers/blogReducer";
import notificationReducer from "./reducers/notificationReducer";

const store = configureStore({
  reducer: { blog: blogReducer, notification: notificationReducer },
});

console.log(store.getState());
export default store;