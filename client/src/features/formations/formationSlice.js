import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  formations: [],

  loading: false,

  error: null,

  success: false,
};

const formationSlice = createSlice({
  name: "formations",

  initialState,

  reducers: {
    /* ================================================= */
    /* ================= CREATE ======================== */
    /* ================================================= */

    createFormationStart: (state) => {
      state.loading = true;

      state.error = null;

      state.success = false;
    },

    createFormationSuccess: (state, action) => {
      state.loading = false;

      state.success = true;

      state.formations.unshift(action.payload);
    },

    createFormationFailure: (state, action) => {
      state.loading = false;

      state.error = action.payload;
    },

    /* ================================================= */
    /* ================= GET FORMATIONS ================ */
    /* ================================================= */

    fetchFormationsStart: (state) => {
      state.loading = true;

      state.error = null;
    },

    fetchFormationsSuccess: (state, action) => {
      state.loading = false;

      state.formations = action.payload;
    },

    fetchFormationsFailure: (state, action) => {
      state.loading = false;

      state.error = action.payload;
    },

    /* ================================================= */
    /* ================= DELETE FORMATION ============== */
    /* ================================================= */

    deleteFormationStart: (state) => {
      state.loading = true;

      state.error = null;
    },

    deleteFormationSuccess: (state, action) => {
      state.loading = false;

      state.formations = state.formations.filter(
        (formation) => formation._id !== action.payload,
      );
    },

    deleteFormationFailure: (state, action) => {
      state.loading = false;

      state.error = action.payload;
    },

    /* ================================================= */
    /* ================= UPDATE FORMATION ============== */
    /* ================================================= */

    updateFormationStart: (state) => {
      state.loading = true;

      state.error = null;
    },

    updateFormationSuccess: (state, action) => {
      state.loading = false;

      state.formations = state.formations.map((formation) =>
        formation._id === action.payload._id ? action.payload : formation,
      );
    },

    updateFormationFailure: (state, action) => {
      state.loading = false;

      state.error = action.payload;
    },

    /* ================================================= */
    /* ================= RESET ========================= */
    /* ================================================= */

    resetFormationState: (state) => {
      state.error = null;

      state.success = false;
    },
  },
});

export const {
  /* CREATE */
  createFormationStart,

  createFormationSuccess,

  createFormationFailure,

  /* GET */
  fetchFormationsStart,

  fetchFormationsSuccess,

  fetchFormationsFailure,

  /* DELETE */
  deleteFormationStart,

  deleteFormationSuccess,

  deleteFormationFailure,

  /* UPDATE */
  updateFormationStart,

  updateFormationSuccess,

  updateFormationFailure,

  /* RESET */
  resetFormationState,
} = formationSlice.actions;

export default formationSlice.reducer;
