import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { IBoard, IBoardData, IBoardState } from "./boardInterface";
import boardService from "./boardService";

const initialState: IBoardState = {
  isError: false,
  isLoading: false,
  isSuccess: false,
  errorMessage: "",
  message: "",
  boards: [],
};

export const createBoard = createAsyncThunk(
  "board/createBoard",
  async (boardData: IBoardData, thunkAPI) => {
    try {
      return await boardService.createBoard(boardData);
    } catch (error: any) {
      const message = error.response.data.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getAllBoards = createAsyncThunk(
  "board/getAllBoards",
  async (_, thunkAPI) => {
    try {
      return await boardService.getAllBoards();
    } catch (error: any) {
      const message = error.response.data.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const boardState = createSlice({
  name: "board",
  initialState,
  reducers: {
    reset: (state: IBoardState) => {
      state.isError = false;
      state.isLoading = false;
      state.isSuccess = false;
      state.message = "";
      state.errorMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createBoard.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        createBoard.fulfilled,
        (state, action: PayloadAction<IBoard>) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.boards = [...state.boards, action.payload];
        }
      )
      .addCase(createBoard.rejected, (state, { payload }: any) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = payload;
      })
      .addCase(getAllBoards.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        getAllBoards.fulfilled,
        (state, action: PayloadAction<IBoard[]>) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.boards = action.payload;
        }
      )
      .addCase(getAllBoards.rejected, (state, { payload }: any) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = payload;
      });
  },
});

export const { reset } = boardState.actions;

export default boardState.reducer;
