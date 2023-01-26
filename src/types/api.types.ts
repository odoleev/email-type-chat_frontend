interface IApi {
  _id: string;
  __v: number;
}

export interface IApiUser extends IApi {
  username: string;
}

export interface IApiMessage extends IApi {
  sender: string;
  recipient: string;
  theme: string;
  text: string;
  date: Date;
  unread: boolean;
}
