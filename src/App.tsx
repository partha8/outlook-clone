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
    })
  );
}

export const App = () => {
  const { emails, total, emailsLoading } = useAppSelector(
    (store) => store.emails
  );
  const dispatch = useAppDispatch();

  const [pageNumber, setPageNumber] = useState<number>(1);
  const [sortBy, setSortBy] = useState<string>("All");

  useEffect(() => {
    dispatch(getEmails(pageNumber));
  }, [pageNumber]);

  const totalPages = Math.floor(total / 10) + 1;

  const sortedEmails = useSortedEmails(emails, sortBy);

  return (
    <main className="main">
      <section className="container">
        <FilterSection sortBy={sortBy} setSortBy={setSortBy} />

        {emailsLoading ? (
          <div className="spinner-container">
            <div className="bt-spinner"></div>
          </div>
        ) : (
          <>
            {sortedEmails?.map((email: Email) => {
              return <EmailComponent key={email.id} {...email} />;
            })}
          </>
        )}

        <section>
          {sortBy === "All" &&
            [...Array(totalPages)].map((_, i) => {
              return (
                <button
                  key={i}
                  onClick={() => setPageNumber(i + 1)}
                  className={`btn pagination-btn ${
                    pageNumber === i + 1 && "active-btn"
                  }`}
                >
                  {i + 1}
                </button>
              );
            })}
        </section>
      </section>
      <EmailBodyComponent />
    </main>
  );
};
