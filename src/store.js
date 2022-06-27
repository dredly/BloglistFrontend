import { configureStore } from "@reduxjs/toolkit";
import notificationReducer from "./reducers/notificationReducer";
import userReducer from "./reducers/userReducer";
import blogReducer from "./reducers/blogReducer";

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    user: userReducer,
    blogs: blogReducer,
  },
});

export default store;
