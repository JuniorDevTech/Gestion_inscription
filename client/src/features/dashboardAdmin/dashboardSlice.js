import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  stats: null,

  loading: false,

  error: null,

  formationStats: [],

  formationLoading: false,

  formationError: null,

  paymentStats: null,

  paymentLoading: false,

  paymentError: null,
};

const dashboardSlice = createSlice({
  name: "dashboard",

  initialState,

  reducers: {
    /* ================================================= */
    /* ================= PAYMENTS ====================== */
    /* ================================================= */

    fetchPaymentStatsStart: (state) => {
      state.paymentLoading = true;

      state.paymentError = null;
    },

    fetchPaymentStatsSuccess: (state, action) => {
      state.paymentLoading = false;

      state.paymentStats = action.payload;
    },

    fetchPaymentStatsFailure: (state, action) => {
      state.paymentLoading = false;

      state.paymentError = action.payload;
    },

    /* ================================================= */
    /* ================= FORMATIONS ==================== */
    /* ================================================= */

    fetchFormationStatsStart: (state) => {
      state.formationLoading = true;

      state.formationError = null;
    },

    fetchFormationStatsSuccess: (state, action) => {
      state.formationLoading = false;

      state.formationStats = action.payload;
    },

    fetchFormationStatsFailure: (state, action) => {
      state.formationLoading = false;

      state.formationError = action.payload;
    },

    /* ================= START ================= */

    fetchDashboardStart: (state) => {
      state.loading = true;

      state.error = null;
    },

    /* ================= SUCCESS ================= */

    fetchDashboardSuccess: (state, action) => {
      state.loading = false;

      state.stats = action.payload;
    },

    /* ================= FAILURE ================= */

    fetchDashboardFailure: (state, action) => {
      state.loading = false;

      state.error = action.payload;
    },
  },
});

export const {
  fetchDashboardStart,
  fetchDashboardSuccess,
  fetchDashboardFailure,

  fetchFormationStatsStart,
  fetchFormationStatsSuccess,
  fetchFormationStatsFailure,

  fetchPaymentStatsStart,
  fetchPaymentStatsSuccess,
  fetchPaymentStatsFailure,
} = dashboardSlice.actions;

export default dashboardSlice.reducer;
