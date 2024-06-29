import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { MarsImagesData } from "../../utils/types";

interface marsImagesDataState {
  data: MarsImagesData;
  isLoading: boolean;
  isError: boolean;
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
          max_sol: "",
          max_date: "",
          total_photos: "",
          cameras: [{ name: "", full_name: "" }],
        },
      },
    ],
  },

  isLoading: false,
  isError: false,
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
    fetchMarsImageDataError(state) {
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
