import { createSlice } from "@reduxjs/toolkit";

export const appSlice = createSlice({
  name: "app",
  initialState: {
    isOpenModalExercice: false,
  },
  reducers: {
    setIsOpenModalExercice: (state, action) => {
      if (state.isOpenModalExercice) {
        state.isOpenModalExercice = false;
      } else {
        state.isOpenModalExercice = true;
      }
    },
  },
});

export const { setIsOpenModalExercice } = appSlice.actions;

export const isOpenModalExercice = (state) => state.app.isOpenModalExercice;

export default appSlice.reducer;
