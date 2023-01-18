import { createAsyncThunk } from "@reduxjs/toolkit";
import { Email } from "../types/emails.types";
import axios from "axios";
import { API_URL } from "../constants";

export const getEmails = createAsyncThunk(
  "emails/getEmails",
  async (pageNumber: Number, thunkAPI) => {
    try {
      const response = await axios.get(`${API_URL}${pageNumber}`);
      if (response.status === 200) {
        return response.data.list;
      }
    } catch (error: any) {
      console.error(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);
