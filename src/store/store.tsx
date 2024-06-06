/* eslint-disable react-refresh/only-export-components */
import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import apodSlice from "./slices/apodSlice";
import marsImagesSlice from "./slices/marsImagesSlice";

const store = configureStore({
  reducer: {
    apod: apodSlice.reducer,
    marsImages: marsImagesSlice.reducer,
  },
});

setupListeners(store.dispatch);

export * from "./slices/apodSlice";
export * from "./slices/marsImagesSlice";
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
