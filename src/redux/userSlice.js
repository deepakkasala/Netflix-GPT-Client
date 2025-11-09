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
// src/redux/userSlice.js
// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   _id: null,
//   name: null,
//   email: null,
//   watchList: [],
//   subscription: null,
//   searchesLeft: 0,
//   token: null,
// };

// const userSlice = createSlice({
//   name: "user",
//   initialState,
//   reducers: {
//     addUser: (state, action) => {
//       const payload = action.payload;

//       // Handle both structures (with or without user wrapper)
//       const normalizedUser = payload.user ? payload.user : payload;

//       state._id = normalizedUser._id || normalizedUser.id || null;
//       state.name = normalizedUser.name || null;
//       state.email = normalizedUser.email || null;
//       state.watchList = normalizedUser.watchList || [];
//       state.subscription = normalizedUser.subscription || null;
//       state.searchesLeft = normalizedUser.searchesLeft || 0;
//       state.token = payload.token || null;
//     },

//     updateUser: (state, action) => {
//       if (!state) return state;
//       return { ...state, ...action.payload };
//     },

//     clearUser: () => initialState,

//     addToWatchList: (state, action) => {
//       if (!state._id) return state;
//       if (!state.watchList.includes(action.payload)) {
//         state.watchList.push(action.payload);
//       }
//     },

//     removeFromWatchList: (state, action) => {
//       if (!state._id) return state;
//       state.watchList = state.watchList.filter((id) => id !== action.payload);
//     },
//   },
// });

// export const {
//   addUser,
//   updateUser,
//   clearUser,
//   addToWatchList,
//   removeFromWatchList,
// } = userSlice.actions;
// export default userSlice.reducer;

// src/redux/userSlice.js
import { createSlice } from "@reduxjs/toolkit";

// Always start with an object, not null
const initialState = {
  _id: null,
  name: null,
  email: null,
  watchList: [],
  subscription: null,
  searchesLeft: 0,
  token: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, action) => {
      const payload = action.payload;

      // Handle both { user, token } or just user directly
      const normalizedUser = payload.user ? payload.user : payload;

      return {
        _id: normalizedUser._id || normalizedUser.id || null,
        name: normalizedUser.name || null,
        email: normalizedUser.email || null,
        watchList: normalizedUser.watchList || [],
        subscription: normalizedUser.subscription || null,
        searchesLeft: normalizedUser.searchesLeft || 0,
        token: payload.token || null,
      };
    },

    updateUser: (state, action) => ({
      ...state,
      ...action.payload,
    }),

    clearUser: () => initialState,

    addToWatchList: (state, action) => {
      if (!state._id) return state; // user not logged in
      if (!state.watchList.includes(action.payload)) {
        return {
          ...state,
          watchList: [...state.watchList, action.payload],
        };
      }
      return state;
    },

    removeFromWatchList: (state, action) => {
      if (!state._id) return state;
      return {
        ...state,
        watchList: state.watchList.filter((id) => id !== action.payload),
      };
    },
  },
});

export const {
  addUser,
  updateUser,
  clearUser,
  addToWatchList,
  removeFromWatchList,
} = userSlice.actions;

export default userSlice.reducer;
