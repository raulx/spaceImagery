import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { MarsImagesData } from "../../utils/types";

interface marsImagesDataState {
  data: MarsImagesData;
  isLoading: boolean;
  isError: boolean;
  errorMessage: string;
}

const initialState: marsImagesDataState = {
  data: {
    photos: [
      {
        img_src: "",
        id: "",
        sol: "",
        earth_date: "",
        camera: { name: "" },
        rover: {
          name: "",
          landing_date: "",
          launch_date: "",
          status: "",
        },
      },
    ],
  },

  isLoading: false,
  isError: false,
  errorMessage: "",
};

const marsImagesSlice = createSlice({
  name: "marsImages",
  initialState,
  reducers: {
    fetchMarsImageDataStart(state) {
      state.isLoading = true;
    },
    fetchMarsImageDataSuccess(state, action: PayloadAction<MarsImagesData>) {
      (state.data = action.payload),
        (state.isLoading = false),
        (state.isError = false);
    },
    fetchMarsImageDataError(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.errorMessage = action.payload;
      state.isError = true;
    },
  },
});

export const {
  fetchMarsImageDataStart,
  fetchMarsImageDataSuccess,
  fetchMarsImageDataError,
} = marsImagesSlice.actions;

export default marsImagesSlice;
