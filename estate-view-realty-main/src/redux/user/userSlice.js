import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  error: null,
  loading: false
};
  
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
      signInStart: (state) => {
          state.loading = true;
      },
      signInSuccess: (state, action) => {
          state.loading = false;
          state.user = action.payload;
          state.error = null;
      },
      signInFailure: (state, action) => {
          state.loading = false;
          state.error = action.payload;
      },
     deleteUserStart: (state) => {
          state.loading = true;
      },
      deleteUserSuccess: (state) => {
          state.user = null;
          state.loading = false;
          state.error = null;
      },
      deleteUserFailure: (state, action) => {
          state.loading = false;
          state.error = action.payload;
      },
      signOutUserStart: (state) => {
        state.loading = true;
    },
    signOutUserSuccess: (state) => {
        state.user = null;
        state.loading = false;
        state.error = null;
    },
    signOutUserFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },
  }
});

export const { 
    signInStart, 
    signInSuccess, 
    signInFailure,
    deleteUserStart,
    deleteUserSuccess,
    deleteUserFailure,
    signOutUserStart,
    signOutUserSuccess,
    signOutUserFailure
} = userSlice.actions;

export default userSlice.reducer;