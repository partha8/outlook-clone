import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import {
  EmailBodyComponent,
  EmailComponent,
  FilterSection,
} from "./components";
import { getEmails } from "./services/emailsService";
import { Email } from "./types/emails.types";
import "./App.css";
import { useSortedEmails } from "./hooks/useSortedEmails";

if (!localStorage.getItem("email-clone")) {
  localStorage.setItem(
    "email-clone",
    JSON.stringify({
      readEmails: [],
      favouriteEmails: [],
      unreadEmails: [],
    })
  );
}

export const App = () => {
  const { emails, total, selectedEmail } = useAppSelector(
    (store) => store.emails
  );
  const dispatch = useAppDispatch();

  const [pageNumber, setPageNumber] = useState<number>(1);
  const [sortBy, setSortBy] = useState<string>("All");

  useEffect(() => {
    dispatch(getEmails(pageNumber));
  }, [pageNumber]);

  const pageNumbers = [];

  if (total) {
    const totalPages = 1 + total / 10;

    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
  }

  const sortedEmails = useSortedEmails(emails, sortBy);

  return (
    <main className="main">
      <section className="container">
        <FilterSection sortBy={sortBy} setSortBy={setSortBy} />

        {sortedEmails?.map((email: Email) => {
          return <EmailComponent key={email.id} {...email} />;
        })}

        <section>
          {sortBy === "All" &&
            pageNumbers.map((number) => {
              return (
                <button
                  key={number}
                  onClick={() => setPageNumber(number)}
                  className={`btn pagination-btn ${
                    pageNumber === number && "active-btn"
                  }`}
                >
                  {number}
                </button>
              );
            })}
        </section>
      </section>

      {selectedEmail && <EmailBodyComponent />}
    </main>
  );
};
