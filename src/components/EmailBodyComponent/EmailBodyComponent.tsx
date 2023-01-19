import { useAppSelector } from "../../app/hooks";
import "./email-body-component.css";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
export const EmailBodyComponent = () => {
  const { selectedEmail } = useAppSelector((store) => store.emails);

  const dateValue = dayjs(selectedEmail?.date).format("DD/MM/YYYY LT");

  if (selectedEmail) {
    return (
      <div className="email-body-container">
        <section className="avatar">{selectedEmail?.name[0]}</section>

        <section className="email-body-contents">
          <h2>{selectedEmail?.subject}</h2>
          <p>{dateValue}</p>
          <section
            dangerouslySetInnerHTML={{ __html: selectedEmail?.body }}
          ></section>
        </section>
      </div>
    );
  }
  return <></>;
};
