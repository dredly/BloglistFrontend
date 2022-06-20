import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";

const blogSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    add(state, action) {
      return state.concat(action.payload);
    },
    setBlogs(state, action) {
      return action.payload.sort((a, b) => b.likes - a.likes);
    },
  },
});

export const { add, setBlogs } = blogSlice.actions;

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch(setBlogs(blogs));
  };
};

export const addNewBlog = (content) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(content);
    dispatch(add(newBlog));
  };
};

export default blogSlice.reducer;
