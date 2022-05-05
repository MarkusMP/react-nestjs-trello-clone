import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {
  ICardState,
  IComment,
  ICreateCommentData,
  IDeleteComment,
  IUpdateComment,
} from "./cardInterface";
import cardService from "./cardService";

const initialState: ICardState = {
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
  errorMessage: "",
  commments: [],
};

export const createCardComment = createAsyncThunk(
  "card/createCardComment",
  async (data: ICreateCommentData, thunkAPI) => {
    try {
      const response = await cardService.createCardComment(data);
      return response;
    } catch (error: any) {
      const message = error.response.data.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getComments = createAsyncThunk(
  "card/getComments",
  async (cardId: string, thunkAPI) => {
    try {
      const response = await cardService.getComments(cardId);
      return response;
    } catch (error: any) {
      const message = error.response.data.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const removeComment = createAsyncThunk(
  "card/removeComment",
  async (commentId: string, thunkAPI) => {
    try {
      const response = await cardService.removeComment(commentId);
      return response;
    } catch (error: any) {
      const message = error.response.data.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updateComment = createAsyncThunk(
  "card/updateComment",
  async (data: IUpdateComment, thunkAPI) => {
    try {
      const response = await cardService.updateComment(data);
      return response;
    } catch (error: any) {
      const message = error.response.data.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

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
      state.commments = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createCardComment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        createCardComment.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.commments = [...state.commments, action.payload];
        }
      )
      .addCase(createCardComment.rejected, (state, { payload }: any) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = payload;
      })
      .addCase(getComments.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getComments.fulfilled, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.commments = action.payload;
      })
      .addCase(getComments.rejected, (state, { payload }: any) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = payload;
      })
      .addCase(removeComment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        removeComment.fulfilled,
        (state, action: PayloadAction<IDeleteComment>) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.commments = state.commments.filter(
            (comment) => comment.id !== action.payload.id
          );
          state.message = action.payload.message;
        }
      )
      .addCase(removeComment.rejected, (state, { payload }: any) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = payload;
      })
      .addCase(updateComment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        updateComment.fulfilled,
        (state, action: PayloadAction<IComment>) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.commments = state.commments.map((comment) => {
            if (comment.id === action.payload.id) {
              return action.payload;
            }
            return comment;
          });
        }
      )
      .addCase(updateComment.rejected, (state, { payload }: any) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = payload;
      });
  },
});

export const { reset } = cardSlice.actions;

export default cardSlice.reducer;
