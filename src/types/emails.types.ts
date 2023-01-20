export type Email = {
  id: string;
  from: {
    email: string;
    name: string;
  };

  date: number;
  subject: string;
  short_description: string;
  read: boolean | null | "" | undefined;
  favourite: boolean | null | "" | undefined;
  unread: boolean | null | "" | undefined;
};

export type SelectedEmail = {
  subject: string;
  date: number;
  id: string;
  body: string;
  name: string;
  favourite: boolean | null | "" | undefined;
};

export type EmailsState = {
  emails: Email[];
  total: number;
  emailsLoading: boolean;
  selectedEmail: SelectedEmail | null;
};
