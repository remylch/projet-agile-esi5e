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
      type: "",
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
      const { duration, data, xp, exercicesDone, type } = action.payload;
      state.dataCurrentExercise.exercisesDone = exercicesDone;
      state.dataCurrentExercise.xp = xp;
      state.dataCurrentExercise.data = data;
      state.dataCurrentExercise.duration = duration;
      state.dataCurrentExercise.type = type;
    },
    cleanUpDataCurrentExercise: (state) => {
      state.dataCurrentExercise.duration = 0;
      state.dataCurrentExercise.data = {};
      state.dataCurrentExercise.xp = 0;
      state.dataCurrentExercise.type = "";
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
    setMistakes: (state, action) => {
      state.userData.totalMistakes =
        state.userData.totalMistakes + action.payload;
    },
    setGoodAnswers: (state, action) => {
      state.userData.totalMistakes =
        state.userData.totalMistakes + action.payload;
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
  setGoodAnswers,
  setMistakes,
} = appSlice.actions;

export const isOpenModalExercice = (state) => state.app.isOpenModalExercice;

export const userDataStored = (state) => state.app.userData;

export const dataCurrentExercise = (state) => state.app.dataCurrentExercise;

export default appSlice.reducer;
