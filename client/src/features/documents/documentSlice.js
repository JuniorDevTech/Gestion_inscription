import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  documents: [],
  loading: false,
  error: null,
};

const documentSlice = createSlice({
  name: "documents",

  initialState,

  reducers: {
    fetchDocumentsStart: (state) => {
      state.loading = true;
    },

    fetchDocumentsSuccess: (state, action) => {
      state.loading = false;
      state.documents = action.payload;
    },

    fetchDocumentsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchDocumentsStart,
  fetchDocumentsSuccess,
  fetchDocumentsFailure,
} = documentSlice.actions;

export default documentSlice.reducer;
