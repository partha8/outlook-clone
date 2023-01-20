import { Email } from "../../types/emails.types";
import "./email-component.css";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getEmail } from "../../services/emailsService";
import { setReadStatus } from "../../features/emailsSlice";

dayjs.extend(localizedFormat);

export const EmailComponent = ({
  id,
  from,
  date,
  subject,
  short_description,
  read,
  favourite,
  unread,
}: Email) => {
  const dateValue = dayjs(date).format("DD/MM/YYYY LT");

  const { selectedEmail } = useAppSelector((store) => store.emails);

  const dispatch = useAppDispatch();

  return (
    <div
      onClick={() => {
        dispatch(getEmail({ subject, date, id, name: from.name, favourite }));
        !read && dispatch(setReadStatus(id));
      }}
      className={`email-card ${read ? "read" : "unread"} ${
        selectedEmail?.id === id && "selected-email"
      } `}
    >
      <section className="avatar">{from.name[0]}</section>
      <section className="email-contents">
        <p>
          From:{" "}
          <span>
            {from.name} {`<${from.email}>`}{" "}
          </span>
        </p>
        <p>
          Subject: <span>{subject}</span>
        </p>
        <p>{short_description}</p>
        <p>
          {dateValue}{" "}
          {favourite && <span className="favourite-tag">Favourite</span>}{" "}
        </p>
      </section>
    </div>
  );
};
