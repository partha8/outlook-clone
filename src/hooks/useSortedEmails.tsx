import { Email } from "../types/emails.types";

export const useSortedEmails = (emails: Email[], sortBy: string) => {
  let newEmails = [...emails];

  if (sortBy === "Unread") {
    newEmails = newEmails.filter((email: Email) => {
      if (email.unread) {
        return email;
      }
    });
  }
  if (sortBy === "Read") {
    newEmails = newEmails.filter((email: Email) => {
      if (email.read) {
        return email;
      }
    });
  }
  if (sortBy === "Favourites") {
    newEmails = newEmails.filter((email: Email) => {
      if (email.favourite) {
        return email;
      }
    });
  }
  const pageNumbers = [];
  let totalPages = 0;
  if (newEmails.length) {
    totalPages = 1 + newEmails.length / 10;
  }

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }
  // return { sortedEmails: newEmails, pageNumbers };
  return newEmails;
};
