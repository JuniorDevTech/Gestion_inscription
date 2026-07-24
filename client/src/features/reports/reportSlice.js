import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  reports: [],
  loading: false,
  error: null,
};

const reportSlice = createSlice({
  name: "reports",

  initialState,

  reducers: {
    fetchReportsStart: (state) => {
      state.loading = true;
    },

    fetchReportsSuccess: (state, action) => {
      state.loading = false;
      state.reports = action.payload;
    },

    fetchReportsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchReportsStart, fetchReportsSuccess, fetchReportsFailure } =
  reportSlice.actions;

export default reportSlice.reducer;
