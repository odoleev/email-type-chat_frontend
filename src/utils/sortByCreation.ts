import { IMessage, IMessages } from '../types/messages.types';

export function sortByCreation(messages: IMessages): IMessages {
  return messages.sort((a: IMessage, b: IMessage) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
}
