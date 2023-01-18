export type Email = {
  id: string;
  from: {
    email: string;
    name: string;
  };

  date: number;
  subject: string;
  short_description: string;
  read: boolean;
  favourite: boolean;
  unread: boolean;
};

export type EmailsState = {
  emails: Email[];
  total: number;
  emailsLoading: boolean;
};
