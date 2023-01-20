import { useAppDispatch, useAppSelector } from "../../app/hooks";
import "./email-body-component.css";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import {
  closeSelectedEmail,
  setFavourtieStatus,
} from "../../features/emailsSlice";
dayjs.extend(localizedFormat);
export const EmailBodyComponent = () => {
  const { selectedEmail } = useAppSelector((store) => store.emails);

  const dispatch = useAppDispatch();

  const dateValue = dayjs(selectedEmail?.date).format("DD/MM/YYYY LT");

  if (selectedEmail) {
    return (
      <div className="email-body-container">
        <button
          onClick={() => dispatch(closeSelectedEmail())}
          className="btn close-btn"
        >
          X
        </button>
        <section className="avatar">{selectedEmail?.name[0]}</section>

        <section className="email-body-contents">
          <div className="email-header">
            <h2>{selectedEmail?.subject}</h2>
            <span
              onClick={() =>
                dispatch(
                  setFavourtieStatus({
                    id: selectedEmail?.id,
                    favourite: selectedEmail?.favourite ? false : true,
                  })
                )
              }
            >
              {" "}
              {selectedEmail?.favourite
                ? "Remove from favourites"
                : "Mark as favourite"}{" "}
            </span>
          </div>
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
