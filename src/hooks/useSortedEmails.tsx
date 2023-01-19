import { Email } from "../types/emails.types";

export const useSortedEmails = (emails: Email[], sortBy: string) => {
  let newEmails = [...emails];

  let localData = JSON.parse(localStorage.getItem("email-clone") || "{}");

  if (sortBy === "Unread") {
    newEmails = newEmails.filter((email) => email.unread);
  }
  if (sortBy === "Read") {
    newEmails = localData?.readEmails;
  }
  if (sortBy === "Favourites") {
    newEmails = localData?.favouriteEmails;
  }
  
  return newEmails;
};
