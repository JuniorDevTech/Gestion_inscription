import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  token: localStorage.getItem("token") || null,
  loading: false,
  error: null,
  users: [],
  usersLoading: false,
  usersError: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    fetchUsersStart: (state) => {
      state.usersLoading = true;

      state.usersError = null;
    },

    fetchUsersSuccess: (state, action) => {
      state.usersLoading = false;

      state.users = action.payload;
    },

    fetchUsersFailure: (state, action) => {
      state.usersLoading = false;

      state.usersError = action.payload;
    },

    /* ================= LOGIN ================= */
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },

    loginSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
      state.token = action.payload.token;

      localStorage.setItem("user", JSON.stringify(action.payload.user));
      localStorage.setItem("token", action.payload.token);

      state.error = null;
    },

    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    /* ================= REGISTER ================= */
    registerStart: (state) => {
      state.loading = true;
      state.error = null;
    },

    registerSuccess: (state) => {
      state.loading = false;
      state.error = null;
    },

    registerFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    /* ================= SYNC /ME ================= */
    setUser: (state, action) => {
      state.user = action.payload;

      localStorage.setItem("user", JSON.stringify(action.payload));
    },

    /* ================= LOGOUT ================= */
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.error = null;
      state.loading = false;

      localStorage.removeItem("token");
      localStorage.removeItem("tokenExpiration");
      localStorage.removeItem("user");
    },

    /* ================= RESET ERROR ================= */
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  fetchUsersStart,
  fetchUsersSuccess,
  fetchUsersFailure,
  loginStart,
  loginSuccess,
  loginFailure,
  registerStart,
  registerSuccess,
  registerFailure,
  logout,
  clearError,
  setUser, // 🔥 IMPORTANT AJOUT
} = authSlice.actions;

export default authSlice.reducer;
