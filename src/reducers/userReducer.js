import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {current: null},
  reducers: {
    changeUser(state, action) {
      if (action.payload) {
        state.current = {
          token: action.payload.token,
          username: action.payload.username,
          name: action.payload.name,
        };
      } else state.current = null;
    },
  },
});

export const { changeUser } = userSlice.actions;

export default userSlice.reducer;
