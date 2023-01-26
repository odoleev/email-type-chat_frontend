export interface IMessage {
  id: string;
  sender: string;
  recipient: string;
  theme: string;
  text: string;
  date: string;
  unread: true;
}

export interface ISendingMessage {
  sender: string;
  recipient: string;
  theme?: string;
  text: string;
}

export type IMessages = Array<IMessage>;
