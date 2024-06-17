/* eslint-disable react-refresh/only-export-components */
import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import apodSlice from "./slices/apodSlice";
import marsImagesSlice from "./slices/marsImagesSlice";
import queryDataSlice from "./slices/queryDataSlice";

const store = configureStore({
  reducer: {
    apod: apodSlice.reducer,
    marsImages: marsImagesSlice.reducer,
    queryData: queryDataSlice.reducer,
  },
});

setupListeners(store.dispatch);

export * from "./slices/apodSlice";
export * from "./slices/marsImagesSlice";
export * from "./slices/queryDataSlice";
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
