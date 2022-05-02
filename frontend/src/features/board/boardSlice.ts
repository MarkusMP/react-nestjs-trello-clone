import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {
  IBoard,
  IBoardData,
  IBoardState,
  IBoardUpdateData,
  IImageData,
  IUploadImageData,
  IMessage,
} from "./boardInterface";
import boardService from "./boardService";

const initialState: IBoardState = {
  isError: false,
  isLoading: false,
  isSuccess: false,
  errorMessage: "",
  message: "",
  boards: [],
  board: null,
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

export const getBoardById = createAsyncThunk(
  "board/getBoardById",
  async (id: string, thunkAPI) => {
    try {
      return await boardService.getBoardById(id);
    } catch (error: any) {
      const message = error.response.data.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updateBoard = createAsyncThunk(
  "board/updateBoard",
  async (boardData: IBoardUpdateData, thunkAPI) => {
    try {
      return await boardService.updateBoard(boardData);
    } catch (error: any) {
      const message = error.response.data.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const uploadBoardImage = createAsyncThunk(
  "board/uploadBoardImage",
  async (data: IUploadImageData, thunkAPI) => {
    try {
      return await boardService.uploadBoardImage(data);
    } catch (error: any) {
      const message = error.response.data.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deleteBoard = createAsyncThunk(
  "board/deleteBoard",
  async (id: string, thunkAPI) => {
    try {
      return await boardService.deleteBoard(id);
    } catch (error: any) {
      const message = error.response.data.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const boardSlice = createSlice({
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
      })
      .addCase(getBoardById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        getBoardById.fulfilled,
        (state, action: PayloadAction<IBoard>) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.board = action.payload;
        }
      )
      .addCase(getBoardById.rejected, (state, { payload }: any) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = payload;
      })
      .addCase(updateBoard.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        updateBoard.fulfilled,
        (state, action: PayloadAction<IBoard>) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.board = action.payload;
        }
      )
      .addCase(updateBoard.rejected, (state, { payload }: any) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = payload;
      })
      .addCase(uploadBoardImage.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        uploadBoardImage.fulfilled,
        (state, action: PayloadAction<IImageData>) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.board!.background = action.payload.photo;
        }
      )
      .addCase(uploadBoardImage.rejected, (state, { payload }: any) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = payload;
      })
      .addCase(deleteBoard.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        deleteBoard.fulfilled,
        (state, action: PayloadAction<IMessage>) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.message = action.payload.message;
        }
      )
      .addCase(deleteBoard.rejected, (state, { payload }: any) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = payload;
      });
  },
});

export const { reset } = boardSlice.actions;

export default boardSlice.reducer;
