export type Email = {
  id: String;
  from: {
    email: String;
    name: String;
  };

  date: Number;
  subject: String;
  short_description: String;
  read: Boolean;
  favourite: Boolean;
  unread: Boolean;
};

export type EmailsState = {
  emails: Email[];
  total: Number;
  emailsLoading: Boolean;
};
