import { Email } from "../../types/emails.types";
import "./email-component.css";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";

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
  
  return (
    <div className={`email-card ${read ? "read" : "unread"}`}>
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
        <p>{dateValue}</p>
      </section>
    </div>
  );
};
