import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  /* ================================================= */
  /* ================= INSCRIPTIONS ================== */
  /* ================================================= */

  inscriptions: [],

  inscription: null,

  recentInscriptions: [],

  /* ================================================= */
  /* ================= STATS ========================= */
  /* ================================================= */

  stats: null,

  recentError: null,

  /* ================================================= */
  /* ================= LOADING ======================= */
  /* ================================================= */

  loading: false,

  statsLoading: false,

  createLoading: false,

  updateLoading: false,

  deleteLoading: false,

  recentLoading: false,

  /* ================================================= */
  /* ================= ERROR ========================= */
  /* ================================================= */

  error: null,

  statsError: null,

  createError: null,

  updateError: null,

  deleteError: null,
};

const inscriptionSlice = createSlice({
  name: "inscriptions",

  initialState,

  reducers: {
    /* ================================================= */
    /* ================= FETCH ONE ===================== */
    /* ================================================= */

    fetchInscriptionStart: (state) => {
      state.loading = true;

      state.error = null;
    },

    fetchInscriptionSuccess: (state, action) => {
      state.loading = false;

      state.inscription = action.payload;
    },

    fetchInscriptionFailure: (state, action) => {
      state.loading = false;

      state.error = action.payload;
    },

    /* ================================================= */
    /* ================= RECENT ======================== */
    /* ================================================= */

    fetchRecentStart: (state) => {
      state.recentLoading = true;

      state.recentError = null;
    },

    fetchRecentSuccess: (state, action) => {
      state.recentLoading = false;

      state.recentInscriptions = action.payload;
    },

    fetchRecentFailure: (state, action) => {
      state.recentLoading = false;

      state.recentError = action.payload;
    },

    /* ================================================= */
    /* ================= FETCH INSCRIPTIONS ============ */
    /* ================================================= */

    fetchInscriptionsStart: (state) => {
      state.loading = true;

      state.error = null;
    },

    fetchInscriptionsSuccess: (state, action) => {
      state.loading = false;

      state.inscriptions = action.payload;
    },

    fetchInscriptionsFailure: (state, action) => {
      state.loading = false;

      state.error = action.payload;
    },

    /* ================================================= */
    /* ================= FETCH STATS =================== */
    /* ================================================= */

    fetchStatsStart: (state) => {
      state.statsLoading = true;

      state.statsError = null;
    },

    fetchStatsSuccess: (state, action) => {
      state.statsLoading = false;

      state.stats = action.payload;
    },

    fetchStatsFailure: (state, action) => {
      state.statsLoading = false;

      state.statsError = action.payload;
    },

    /* ================================================= */
    /* ================= CREATE ======================== */
    /* ================================================= */

    createInscriptionStart: (state) => {
      state.loading = true;

      state.error = null;
    },

    createInscriptionSuccess: (state, action) => {
      state.loading = false;

      state.inscriptions.unshift(action.payload);
    },

    createInscriptionFailure: (state, action) => {
      state.loading = false;

      state.error = action.payload;
    },

    /* ================================================= */
    /* ================= UPDATE STATUS ================= */
    /* ================================================= */

    updateInscriptionStart: (state) => {
      state.updateLoading = true;

      state.updateError = null;
    },

    updateInscriptionSuccess: (state, action) => {
      state.updateLoading = false;

      state.inscriptions = state.inscriptions.map((inscription) =>
        inscription._id === action.payload._id ? action.payload : inscription,
      );
    },

    updateInscriptionFailure: (state, action) => {
      state.updateLoading = false;

      state.updateError = action.payload;
    },

    /* ================================================= */
    /* ================= DELETE ======================== */
    /* ================================================= */

    deleteInscriptionStart: (state) => {
      state.deleteLoading = true;

      state.deleteError = null;
    },

    deleteInscriptionSuccess: (state, action) => {
      state.deleteLoading = false;

      state.inscriptions = state.inscriptions.filter(
        (inscription) => inscription._id !== action.payload,
      );
    },

    deleteInscriptionFailure: (state, action) => {
      state.deleteLoading = false;

      state.deleteError = action.payload;
    },

    /* ================================================= */
    /* ================= RESET ========================= */
    /* ================================================= */

    resetInscriptionState: (state) => {
      state.error = null;

      state.statsError = null;

      state.createError = null;

      state.updateError = null;

      state.deleteError = null;
    },
  },
});

export const {
  /* FETCH */
  fetchInscriptionsStart,

  fetchInscriptionsSuccess,

  fetchInscriptionsFailure,

  /* STATS */
  fetchStatsStart,

  fetchStatsSuccess,

  fetchStatsFailure,

  /* CREATE */
  createInscriptionStart,

  createInscriptionSuccess,

  createInscriptionFailure,

  /* UPDATE */
  updateInscriptionStart,

  updateInscriptionSuccess,

  updateInscriptionFailure,

  /* DELETE */
  deleteInscriptionStart,

  deleteInscriptionSuccess,

  deleteInscriptionFailure,

  /* FETCH ONE */

  fetchInscriptionStart,

  fetchInscriptionSuccess,

  fetchInscriptionFailure,

  /* RECENT */

  fetchRecentStart,
  fetchRecentSuccess,
  fetchRecentFailure,

  /* RESET */
  resetInscriptionState,
} = inscriptionSlice.actions;

export default inscriptionSlice.reducer;
