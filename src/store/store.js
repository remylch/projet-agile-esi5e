import { configureStore } from "@reduxjs/toolkit";
import appReducer from "../store/appSlice";

export default configureStore({
  reducer: {
    app: appReducer,
  },
});
