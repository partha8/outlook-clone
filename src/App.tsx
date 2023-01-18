import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { getEmails } from "./services/emailsService";

export const App = () => {
  const { emails } = useAppSelector((store) => store.emails);
  const dispatch = useAppDispatch();

  const [pageNumber, setPageNumber] = useState<Number>(1);
  useEffect(() => {
    dispatch(getEmails(pageNumber));
  }, [pageNumber]);
  return <></>;
};
