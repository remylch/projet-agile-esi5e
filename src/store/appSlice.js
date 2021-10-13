import { createSlice } from "@reduxjs/toolkit";

export const appSlice = createSlice({
  name: "app",
  initialState: {
    isOpenModalExercice: false,
    userData: {},
  },
  reducers: {
    setIsOpenModalExercice: (state, action) => {
      if (state.isOpenModalExercice) {
        state.isOpenModalExercice = false;
      } else {
        state.isOpenModalExercice = true;
      }
    },
    setUpUserData: (state, action) => {
      state.userData = action.payload;
    },
    cleanUpUserData: (state) => {
      state.userData = {};
    },
  },
});

export const { setIsOpenModalExercice, setUpUserData, cleanUpUserData } =
  appSlice.actions;

export const isOpenModalExercice = (state) => state.app.isOpenModalExercice;

export const userDataStored = (state) => state.app.userData;

export default appSlice.reducer;
