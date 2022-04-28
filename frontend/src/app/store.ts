import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import authSlice from "../features/auth/authSlice";
import boardSlice from "../features/board/boardSlice";
import profileSlice from "../features/profile/profileSlice";

export const rootReducer = {
  auth: authSlice,
  board: boardSlice,
  profile: profileSlice,
};

export const store = configureStore({
  reducer: {
    auth: authSlice,
    board: boardSlice,
    profile: profileSlice,
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
