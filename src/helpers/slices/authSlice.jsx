import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userData: { token: "", name: "" },
  authState: false,
  formType: "login",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    formAction: (state, action) => {
      state.formType = action.payload.formType;
    },
    userDataAction: (state, action) => {
      state.userData = action.payload;
    },
    userNameAction: (state, action) => {
      state.userData.name = action.payload;
    },
    authAction: (state, action) => {
      state.authState = action.payload;
    },
    resetAuth: (state) => {
      return initialState;
    },
  },
});

export default authSlice.reducer;
export const {
  formAction,
  userDataAction,
  userNameAction,
  authAction,
  resetAuth,
} = authSlice.actions;

export const getFormType = (state) => state.auth.formType;
export const getToken = (state) => state.auth.userData.token;
export const getName = (state) => state.auth.userData.name;
export const getAuthState = (state) => state.auth.authState;
