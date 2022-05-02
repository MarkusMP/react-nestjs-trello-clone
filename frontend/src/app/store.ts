import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import authSlice from "../features/auth/authSlice";
import boardSlice from "../features/board/boardSlice";
import profileSlice from "../features/profile/profileSlice";
import listSlice from "../features/list/listSlice";

export const rootReducer = {
  auth: authSlice,
  board: boardSlice,
  profile: profileSlice,
  list: listSlice,
};

export const store = configureStore({
  reducer: {
    auth: authSlice,
    board: boardSlice,
    profile: profileSlice,
    list: listSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
