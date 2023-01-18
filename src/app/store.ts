import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import emailsReducer from "../features/emailsSlice";

export const store = configureStore({
  reducer: {
    emails: emailsReducer,
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
