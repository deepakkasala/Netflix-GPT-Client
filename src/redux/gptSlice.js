import { createSlice } from "@reduxjs/toolkit";

const gptSlice = createSlice({
  name: "gpt",
  initialState: {
    showGptSearch: false,
    movieNames: null,
    movieResults: null,
    isGptSuggestionsLoading: null,
  },
  reducers: {
    toggleShowGptSearch: (state) => {
      state.showGptSearch = !state.showGptSearch;
    },
    toggleIsGptSuggestionsLoading: (state, action) => {
      state.isGptSuggestionsLoading = action.payload;
    },
    addGptMoviesResult: (state, action) => {
      const { movieNames, movieResults } = action.payload;
      state.movieNames = movieNames;
      state.movieResults = movieResults;
    },
    clearGpt: (state, action) => {
      state.movieNames = action.payload;
      state.movieResults = action.payload;
    },
  },
});

export const {
  toggleShowGptSearch,
  toggleIsGptSuggestionsLoading,
  addGptMoviesResult,
  clearGpt,
} = gptSlice.actions;
export default gptSlice.reducer;
