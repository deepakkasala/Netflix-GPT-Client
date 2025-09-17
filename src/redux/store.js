// import { configureStore } from "@reduxjs/toolkit";
// import userReducer from "./userSlice";
// import moviesReducer from "./moviesSlice";
// const store = configureStore({
//   reducer: {
//     user: userReducer,
//     movies: moviesReducer,
//   },
// });

// export default store;

// import { configureStore } from "@reduxjs/toolkit";
// import userReducer from "./userSlice";
// import moviesReducer from "./moviesSlice";
// import gptReducer from "./gptSlice";
// import configReducer from "./configSlice";

// const store = configureStore({
//   reducer: {
//     user: userReducer,
//     movies: moviesReducer,
//     gpt: gptReducer,
//     config: configReducer,
//   },
//   preloadedState: {
//     user: localStorage.getItem("user")
//       ? JSON.parse(localStorage.getItem("user"))
//       : null,
//     token: localStorage.getItem("token") ? localStorage.getItem("token") : null,
//   },
// });

// export default store;

import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import moviesReducer from "./moviesSlice";
import gptReducer from "./gptSlice";
import configReducer from "./configSlice";

// Load persisted state from localStorage
const persistedState = {
  user: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null,
  auth: {
    token: localStorage.getItem("token") ? localStorage.getItem("token") : null,
  },
};

const store = configureStore({
  reducer: {
    user: userReducer,
    movies: moviesReducer,
    gpt: gptReducer,
    config: configReducer,
    // 👇 add a dedicated slice for auth
    auth: (state = { token: null }, action) => {
      switch (action.type) {
        case "auth/setToken":
          return { token: action.payload };
        case "auth/clearToken":
          return { token: null };
        default:
          return state;
      }
    },
  },
  preloadedState: persistedState,
});

export default store;
