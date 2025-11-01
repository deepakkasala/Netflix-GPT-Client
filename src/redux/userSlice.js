// import { createSlice } from "@reduxjs/toolkit";

// const userSlice = createSlice({
//   name: "user",
//   initialState: null,
//   reducers: {
//     addUser: (state, action) => {
//       return action.payload;
//     },
//     clearUser: (state) => {
//       return null;
//     },
//   },
// });

// export const { addUser, clearUser } = userSlice.actions;
// export default userSlice.reducer;

// import { createSlice } from "@reduxjs/toolkit";

// const userSlice = createSlice({
//   name: "user",
//   initialState: null,
//   reducers: {
//     addUser: (state, action) => action.payload,
//     clearUser: () => null,
//   },
// });

// export const { addUser, clearUser } = userSlice.actions;
// export default userSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    addUser: (state, action) => action.payload,
    clearUser: () => null,
    // ➕ Add to WatchList
    addToWatchList: (state, action) => {
      if (!state) return state; // user not logged in
      if (!state.watchList) state.watchList = [];
      if (!state.watchList.includes(action.payload)) {
        state.watchList.push(action.payload);
      }
    },

    // ❌ Remove from WatchList
    removeFromWatchList: (state, action) => {
      if (!state) return state;
      if (state.watchList) {
        state.watchList = state.watchList.filter((id) => id !== action.payload);
      }
    },
  },
});

export const { addUser, clearUser, addToWatchList, removeFromWatchList } =
  userSlice.actions;
export default userSlice.reducer;
