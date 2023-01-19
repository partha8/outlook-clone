import { createAsyncThunk } from "@reduxjs/toolkit";
import { Email, SelectedEmail } from "../types/emails.types";
import axios from "axios";
import { API_URL, EMAIL_URL } from "../constants";

export const getEmails = createAsyncThunk(
  "emails/getEmails",
  async (pageNumber: Number, thunkAPI) => {
    let localData = JSON.parse(localStorage.getItem("email-clone") || "{}");

    try {
      const response = await axios.get(`${API_URL}${pageNumber}`);
      if (response.status === 200) {
        let emails = response.data.list;
        emails = emails.map((email: Email) => {
          if (
            localData?.favouriteEmails?.some(
              (favouriteEmail: Email) => favouriteEmail.id === email.id
            )
          ) {
            email = { ...email, favourite: true };
          }

          if (
            localData?.readEmails?.some(
              (readEmail: Email) => readEmail.id === email.id
            )
          ) {
            email = { ...email, read: true, unread: false };
          } else {
            email = { ...email, unread: true, read: false };
          }
          return email;
        });
        return { emails, total: response.data.total };
      }
    } catch (error: any) {
      console.error(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getEmail = createAsyncThunk(
  "emails/getEmail",
  async (
    {
      subject,
      date,
      id,
      name,
    }: { subject: string; date: number; id: string; name: string },
    thunkAPI
  ) => {
    try {
      const response = await axios.get(`${EMAIL_URL}${id}`);
      return { name,subject, id, date, body: response.data.body } as SelectedEmail;
    } catch (error: any) {
      console.error(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);
