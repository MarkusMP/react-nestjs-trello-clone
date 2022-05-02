import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {
  ICreateListData,
  IDeleteData,
  IDeleteList,
  IList,
  IListState,
  IMoveListData,
  IUpdateListData,
} from "./listInterface";
import listService from "./listService";

const initialState: IListState = {
  isError: false,
  isLoading: false,
  isSuccess: false,
  errorMessage: "",
  message: "",
  lists: [],
};

export const createList = createAsyncThunk(
  "list/createList",
  async (data: ICreateListData, thunkAPI) => {
    try {
      return await listService.createList(data);
    } catch (error: any) {
      const message = error.response.data.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getAllLists = createAsyncThunk(
  "list/getAllLists",
  async (boardId: string, thunkAPI) => {
    try {
      return await listService.getAllLists(boardId);
    } catch (error: any) {
      const message = error.response.data.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const removeList = createAsyncThunk(
  "list/removeList",
  async (data: IDeleteList, thunkAPI) => {
    try {
      return await listService.removeList(data);
    } catch (error: any) {
      const message = error.response.data.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updateList = createAsyncThunk(
  "list/updateList",
  async (data: IUpdateListData, thunkAPI) => {
    try {
      return await listService.updateList(data);
    } catch (error: any) {
      const message = error.response.data.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const moveList = createAsyncThunk(
  "list/moveList",
  async (data: IMoveListData, thunkAPI) => {
    try {
      return await listService.moveList(data);
    } catch (error: any) {
      const message = error.response.data.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const listSlice = createSlice({
  name: "list",
  initialState,
  reducers: {
    reset: (state: IListState) => {
      state.isError = false;
      state.isLoading = false;
      state.isSuccess = false;
      state.message = "";
      state.errorMessage = "";
    },
    updateListMoved: (state: IListState, action: PayloadAction<any>) => {
      state.lists = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createList.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createList.fulfilled, (state, action: PayloadAction<IList>) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.lists = [...state.lists, action.payload];
      })
      .addCase(createList.rejected, (state, { payload }: any) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = payload;
      })
      .addCase(getAllLists.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        getAllLists.fulfilled,
        (state, action: PayloadAction<IList[]>) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.lists = action.payload;
        }
      )
      .addCase(getAllLists.rejected, (state, { payload }: any) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = payload;
      })
      .addCase(removeList.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        removeList.fulfilled,
        (state, action: PayloadAction<IDeleteData>) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.message = action.payload.message;
          state.lists = state.lists.filter(
            (list) => list.id !== action.payload.listId
          );
        }
      )
      .addCase(removeList.rejected, (state, { payload }: any) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = payload;
      })
      .addCase(updateList.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateList.fulfilled, (state, action: PayloadAction<IList>) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.lists = state.lists.map((list) => {
          if (list.id === action.payload.id) {
            return action.payload;
          }
          return list;
        });
      })
      .addCase(updateList.rejected, (state, { payload }: any) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = payload;
      })
      .addCase(moveList.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(moveList.fulfilled, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.lists = state.lists
          .map((list) => {
            if (list.id === action.payload.UpdatedMovedList.id) {
              return {
                ...list,
                position: action.payload.UpdatedMovedList.position,
              };
            } else if (list.id === action.payload.UpdatedPositionList.id) {
              return {
                ...list,
                position: action.payload.UpdatedPositionList.position,
              };
            }
            return list;
          })
          .sort((a, b) => a.position - b.position);
      })
      .addCase(moveList.rejected, (state, { payload }: any) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = payload;
      });
  },
});

export const { reset, updateListMoved } = listSlice.actions;

export default listSlice.reducer;
