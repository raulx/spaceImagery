import { createSlice } from "@reduxjs/toolkit";

const queryDataSlice = createSlice({
  name: "queryData",
  initialState: { rawData: [], isLoading: false, isError: false },
  reducers: {
    fetchQueryDataStart(state) {
      state.isLoading = true;
    },
    fetchQueryDataSuccess(state) {
      state.isLoading = false;
    },
    fetchQueryDataError(state) {
      state.isError = true;
      state.isLoading = false;
    },
  },
});

export const {
  fetchQueryDataStart,
  fetchQueryDataSuccess,
  fetchQueryDataError,
} = queryDataSlice.actions;

export default queryDataSlice;
