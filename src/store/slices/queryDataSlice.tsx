import { createSlice } from "@reduxjs/toolkit";

interface queryData {
  collection: [
    {
      href: string;
      data: [
        {
          nasa_id: string;
          title: string;
          media_type: string;
          description: string;
        }
      ];
      links: [{ href: string }];
    }
  ];
  metadata: { total_hits: number };
  links: [{ rel: string; prompt: string; href: string }];
  isLoading: boolean;
  isError: boolean;
  errorMessage: string;
}

const initialState: queryData = {
  collection: [
    {
      href: "",
      data: [
        {
          nasa_id: "",
          title: "",
          media_type: "",
          description: "",
        },
      ],
      links: [{ href: "" }],
    },
  ],
  metadata: {
    total_hits: 0,
  },
  links: [{ rel: "", prompt: "", href: "" }],
  isLoading: false,
  isError: false,
  errorMessage: "Search The Database",
};

const queryDataSlice = createSlice({
  name: "queryData",
  initialState: initialState,
  reducers: {
    fetchQueryDataStart(state) {
      state.isLoading = true;
    },
    fetchQueryDataSuccess(state, action) {
      state.isLoading = false;
      state.isError = false;
      (state.collection = action.payload.items),
        (state.links = action.payload.links),
        (state.metadata = action.payload.metadata);
    },
    fetchQueryDataError(state, action) {
      state.isError = true;
      state.isLoading = false;
      state.errorMessage = action.payload;
    },
  },
});

export const {
  fetchQueryDataStart,
  fetchQueryDataSuccess,
  fetchQueryDataError,
} = queryDataSlice.actions;

export default queryDataSlice;
