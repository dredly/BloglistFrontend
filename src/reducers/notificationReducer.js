import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: {},
  reducers: {
    changeNotification(state, action) {
      state.content = action.payload.content;
      state.messageType = action.payload.messageType;
    },
  },
});

export const { changeNotification } = notificationSlice.actions;

export const setNotification = (content, time) => {
  return async (dispatch) => {
    dispatch(changeNotification(content));
    setTimeout(() => {
      dispatch(changeNotification({}));
    }, time);
  };
};

export default notificationSlice.reducer;
