import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ApodData } from "../../utils/types";

interface ApodState {
  data: ApodData | null;
  isFetching: boolean;
}

const initialState: ApodState = {
  data: null,
  isFetching: false,
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
  },
});

export const { fetchApodDataStart, fetchApodDataSuccess } = apodSlice.actions;
export default apodSlice;
