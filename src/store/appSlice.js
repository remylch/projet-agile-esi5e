import { createSlice } from "@reduxjs/toolkit";

export const appSlice = createSlice({
  name: "app",
  initialState: {
    isOpenModalExercice: false,
    userData: {},
    dataCurrentExercise: {
      data: {},
      duration: 0,
    },
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
    setDataCurrentExercise: (state, action) => {
      const { duration, data } = action.payload;
      state.dataCurrentExercise.data = data;
      state.dataCurrentExercise.duration = duration;
    },
    cleanUpDataCurrentExercise: (state) => {
      state.dataCurrentExercise.duration = 0;
      state.dataCurrentExercise.data = {};
    },
  },
});

export const {
  setIsOpenModalExercice,
  setUpUserData,
  cleanUpUserData,
  setDataCurrentExercise,
  cleanUpDataCurrentExercise,
} = appSlice.actions;

export const isOpenModalExercice = (state) => state.app.isOpenModalExercice;

export const userDataStored = (state) => state.app.userData;

export const dataCurrentExercise = (state) => state.app.dataCurrentExercise;

export default appSlice.reducer;
