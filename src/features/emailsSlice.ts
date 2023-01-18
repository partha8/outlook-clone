import { createSlice } from "@reduxjs/toolkit";
import { getEmails } from "../services/emailsService";
import { Email, EmailsState } from "../types/emails.types";

const initialState: EmailsState = {
  emails: [],
  total: 0,
  emailsLoading: true,
};

const emailsSlice = createSlice({
  name: "emails",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getEmails.pending, (state) => {
        state.emailsLoading = true;
      })
      .addCase(getEmails.fulfilled, (state, action) => {
        state.emails = action.payload.map((email: Email) => {
          return { ...email, favourite: false, unread: true, read: false };
        });
        state.emailsLoading = false;
      });
  },
});

export default emailsSlice.reducer;
