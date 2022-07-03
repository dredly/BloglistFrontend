import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";

const blogSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    add(state, action) {
      return state.concat(action.payload);
    },
    like(state, action) {
      const id = action.payload;
      const blogToUpdate = state.find((b) => b.id === id);
      const updatedBlog = {
        ...blogToUpdate,
        likes: blogToUpdate.likes + 1,
      };
      return state
        .map((b) => (b.id !== id ? b : updatedBlog))
        .sort((a, b) => b.likes - a.likes);
    },
    comment(state, action) {
      const { id, addedComment } = action.payload;
      const blogToUpdate = state.find((b) => b.id === id);
      const updatedBlog = {
        ...blogToUpdate,
        comments: blogToUpdate.comments.concat(addedComment),
      };
      return state.map((b) => (b.id !== id ? b : updatedBlog));
    },
    destroy(state, action) {
      const id = action.payload;
      return state.filter((b) => b.id !== id);
    },
    setBlogs(state, action) {
      return action.payload.sort((a, b) => b.likes - a.likes);
    },
  },
});

export const { add, like, comment, destroy, setBlogs } = blogSlice.actions;

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

export const likeBlog = (id) => {
  return async (dispatch) => {
    await blogService.likeBlog(id);
    dispatch(like(id));
  };
};

export const commentOnBlog = (id, newComment) => {
  return async (dispatch) => {
    const addedComment = await blogService.addComment(id, newComment);
    dispatch(comment({ id, addedComment }));
  };
};

export const deleteBlog = (id) => {
  return async (dispatch) => {
    await blogService.deleteBlog(id);
    dispatch(destroy(id));
  };
};

export default blogSlice.reducer;
