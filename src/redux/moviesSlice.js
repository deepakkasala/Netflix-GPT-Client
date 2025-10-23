import { createSlice } from "@reduxjs/toolkit";

const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    nowPlayingMovies: null,
    popularMovies: null,
    topRatedMovies: null,
    upcomingMovies: null,
    trendingMoviesDay: null,
    trendingMoviesWeek: null,
    trailerVideo: null,
    isViewModal: false,
    selectedMovie: null,
  },
  reducers: {
    addNowPlayingMovies: (state, action) => {
      state.nowPlayingMovies = action.payload;
    },
    addPopularMovies: (state, action) => {
      state.popularMovies = action.payload;
    },
    addTopRatedMovies: (state, action) => {
      state.topRatedMovies = action.payload;
    },
    addUpcomingMovies: (state, action) => {
      state.upcomingMovies = action.payload;
    },
    addTrendingMoviesDay: (state, action) => {
      state.trendingMoviesDay = action.payload;
    },
    addTrendingMoviesWeek: (state, action) => {
      state.trendingMoviesWeek = action.payload;
    },
    addTrailerVideo: (state, action) => {
      state.trailerVideo = action.payload;
    },
    setIsViewModal: (state, action) => {
      state.isViewModal = action.payload;
    },
    setSelectedMovie: (state, action) => {
      state.selectedMovie = action.payload;
    },
  },
});

export const {
  addNowPlayingMovies,
  addPopularMovies,
  addTopRatedMovies,
  addUpcomingMovies,
  addTrendingMoviesDay,
  addTrendingMoviesWeek,
  addTrailerVideo,
  setIsViewModal,
  setSelectedMovie,
} = moviesSlice.actions;
export default moviesSlice.reducer;
