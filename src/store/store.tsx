/* eslint-disable react-refresh/only-export-components */
import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import apodSlice from "./slices/apodSlice";

const store = configureStore({
  reducer: {
    apod: apodSlice.reducer,
  },
});

setupListeners(store.dispatch);

export * from "./slices/apodSlice";
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
