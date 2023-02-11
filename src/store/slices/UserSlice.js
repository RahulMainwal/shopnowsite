import { createSlice } from "@reduxjs/toolkit";
// import axios from "axios";

const getLoginTokenFromLc = JSON.parse(localStorage.getItem("login-token"));

const userSlice = createSlice({
  name: "user",
  initialState: {
    loginToken:
      getLoginTokenFromLc === undefined || getLoginTokenFromLc === null
        ? ""
        : getLoginTokenFromLc
  },
  reducers: {
    addLoginToken(state, action) {
      return (state = {
        loginToken: action.payload
      });
    },
    removeLoginToken(state, action) {
      return (state = {
        loginToken: ""
      });
    }
  }
});

export default userSlice.reducer;
export const { addLoginToken, removeLoginToken } = userSlice.actions;
