import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  payments: [],
  loading: false,
  error: null,
};

const paymentSlice = createSlice({
  name: "payments",

  initialState,

  reducers: {
    fetchPaymentsStart: (state) => {
      state.loading = true;
    },

    fetchPaymentsSuccess: (state, action) => {
      state.loading = false;
      state.payments = action.payload;
    },

    fetchPaymentsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchPaymentsStart,
  fetchPaymentsSuccess,
  fetchPaymentsFailure,
} = paymentSlice.actions;

export default paymentSlice.reducer;
