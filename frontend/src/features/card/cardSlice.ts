import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { ICardState } from "./cardInterface";

const initialState: ICardState = {
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
  errorMessage: "",
};

const cardSlice = createSlice({
  name: "card",
  initialState,
  reducers: {
    reset: (state: ICardState) => {
      state.isError = false;
      state.isLoading = false;
      state.isSuccess = false;
      state.message = "";
      state.errorMessage = "";
    },
  },
  extraReducers: (builder) => {},
});

export const { reset } = cardSlice.actions;

export default cardSlice.reducer;
