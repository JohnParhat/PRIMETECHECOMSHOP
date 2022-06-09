import { createSlice } from '@reduxjs/toolkit';

export const registerSlice = createSlice({
  name: 'register',
  initialState: {
    registerErrorMessage: null,
  },
  reducers: {
    setRegisterErrorMessage: (state, action) => {
      state.registerErrorMessage = action.payload;
    },
    clearRegisterErrorMessage: (state) => {
      state.registerErrorMessage = null;
    },
  },
});

export const { setRegisterErrorMessage, clearRegisterErrorMessage } =
  registerSlice.actions;
export default registerSlice.reducer;
