import { createSlice } from "@reduxjs/toolkit";
import { EmailsState } from "../types/emails.types";

const initialState: EmailsState = {
  emails: [],
  total: 0,
};

const emailsSlice = createSlice({
  name: "emails",
  initialState,
  reducers: {},
  extraReducers(builders) {},
});

export default emailsSlice.reducer;
