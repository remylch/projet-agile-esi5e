import { createSlice } from "@reduxjs/toolkit";

export const appSlice = createSlice({
  name: "app",
  initialState: {
    isOpenModalExercice: false,
    userData: {},
    dataCurrentExercise: {
      data: {},
      duration: 0,
      xp: 0,
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
      const { duration, data, xp, exercicesDone } = action.payload;
      state.dataCurrentExercise.exercisesDone = exercicesDone;
      state.dataCurrentExercise.xp = xp;
      state.dataCurrentExercise.data = data;
      state.dataCurrentExercise.duration = duration;
    },
    cleanUpDataCurrentExercise: (state) => {
      state.dataCurrentExercise.duration = 0;
      state.dataCurrentExercise.data = {};
    },
    setUserLevel: (state, action) => {
      state.userData.level = action.payload;
    },
    incrementExercicesDone: (state) => {
      state.userData.exercicesDone = state.userData.exercicesDone + 1;
    },
    setTimePassed: (state, action) => {
      state.userData.timePassed = state.userData.timePassed + action.payload;
    },
  },
});

export const {
  setIsOpenModalExercice,
  setUpUserData,
  cleanUpUserData,
  setDataCurrentExercise,
  cleanUpDataCurrentExercise,
  setUserLevel,
  incrementExercicesDone,
  setTimePassed,
} = appSlice.actions;

export const isOpenModalExercice = (state) => state.app.isOpenModalExercice;

export const userDataStored = (state) => state.app.userData;

export const dataCurrentExercise = (state) => state.app.dataCurrentExercise;

export default appSlice.reducer;
