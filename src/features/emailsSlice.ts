import { createSlice } from "@reduxjs/toolkit";
import { getEmails, getEmail } from "../services/emailsService";
import { Email, EmailsState } from "../types/emails.types";

const initialState: EmailsState = {
  emails: [],
  total: 0,
  emailsLoading: true,
  selectedEmail: null,
};

const emailsSlice = createSlice({
  name: "emails",
  initialState,
  reducers: {
    setReadStatus(state, action) {
      let reademail: Email;
      state.emails = state.emails.map((email) => {
        let localData = JSON.parse(localStorage.getItem("email-clone") || "{}");
        if (action.payload === email.id) {
          reademail = { ...email, read: true, unread: false };

          localData = {
            readEmails: localData.readEmails
              ? [...localData.readEmails, reademail]
              : [reademail],
            favouriteEmails: localData.favouriteEmails,
          };

          localStorage.setItem("email-clone", JSON.stringify(localData));

          return reademail;
        }
        return email;
      });
    },

    closeSelectedEmail(state) {
      state.selectedEmail = null;
    },

    setFavourtieStatus(state, action) {
      let favouriteemail: Email;
      state.emails = state.emails.map((email) => {
        let localData = JSON.parse(localStorage.getItem("email-clone") || "{}");
        if (action.payload.id === email.id) {
          favouriteemail = { ...email, favourite: action.payload.favourite };

          localData = {
            favouriteEmails: action.payload.favourite
              ? localData.favouriteEmails
                ? [...localData.favouriteEmails, favouriteemail]
                : [favouriteemail]
              : localData.favouriteEmails.filter(
                  (mail: Email) => mail.id !== action.payload.id
                ),
            readEmails: localData.readEmails,
          };

          localStorage.setItem("email-clone", JSON.stringify(localData));

          return favouriteemail;
        }
        return email;
      });

      state.selectedEmail = {
        subject: state.selectedEmail!.subject,
        date: state.selectedEmail!.date,
        favourite: action.payload.favourite,
        name: state.selectedEmail!.name,
        id: state.selectedEmail!.id,
        body: state.selectedEmail!.body,
      };
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getEmails.pending, (state) => {
        state.emailsLoading = true;
      })
      .addCase(getEmails.fulfilled, (state, action) => {
        state.emails = action.payload?.emails;
        state.emailsLoading = false;
        state.total = action.payload?.total;
      })

      .addCase(getEmail.fulfilled, (state, action) => {
        state.selectedEmail = action.payload;
      });
  },
});

export const { setReadStatus, closeSelectedEmail, setFavourtieStatus } =
  emailsSlice.actions;
export default emailsSlice.reducer;
