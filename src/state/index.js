import { createSlice, combineReducers } from "@reduxjs/toolkit";
import { api } from "./api";

const initialState = {
  mode: "light",
  user: null,
  token: null,
  customers: [],
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { setMode, setLogin, setLogout } = authSlice.actions;

const rootReducer = combineReducers({
  auth: authSlice.reducer,
  [api.reducerPath]: api.reducer,
});

export default rootReducer;
