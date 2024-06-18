import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ApodData } from "../../utils/types";

interface ApodState {
  data: ApodData | null;
  isFetching: boolean;
  isError: boolean;
}

const initialState: ApodState = {
  data: null,
  isFetching: false,
  isError: false,
};
const apodSlice = createSlice({
  name: "apod",
  initialState,
  reducers: {
    fetchApodDataStart(state) {
      state.isFetching = true;
    },
    fetchApodDataSuccess(state, action: PayloadAction<ApodData>) {
      state.data = action.payload;
      state.isFetching = false;
    },
    fetchApodDataError(state) {
      state.isFetching = false;
      state.isError = true;
    },
  },
});

export const { fetchApodDataStart, fetchApodDataSuccess, fetchApodDataError } =
  apodSlice.actions;
export default apodSlice;
