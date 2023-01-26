import { AppDispatch } from '../../index';
import api from '../../../api/axiosClient';
import { IMessages, ISendingMessage } from '../../../types/messages.types';
import {
  IClearReceivedAction,
  IClearSentAction,
  ISetReceivedAction,
  ISetSentAction,
  MessagesActionsEnum,
} from './types';
import { IApiMessage } from '../../../types/api.types';
import { sortByCreation } from '../../../utils/sortByCreation';

export const messagesActionCreator = {
  setSent: (messages: IMessages): ISetSentAction => ({
    type: MessagesActionsEnum.SET_SENT,
    payload: messages,
  }),
  setReceived: (messages: IMessages): ISetReceivedAction => ({
    type: MessagesActionsEnum.SET_RECEIVED,
    payload: messages,
  }),
  clearSent: (): IClearSentAction => ({
    type: MessagesActionsEnum.CLEAR_SENT,
  }),
  clearReceived: (): IClearReceivedAction => ({
    type: MessagesActionsEnum.CLEAR_RECEIVED,
  }),
  getSent: (username: string) => async (dispatch: AppDispatch) => {
    try {
      const result = await api.post('/messages/sent', {
        username,
      });

      const sentMessages = sortByCreation(
        result.data.map((el: IApiMessage) => {
          return {
            id: el._id as string,
            sender: el.sender,
            recipient: el.recipient,
            theme: el.theme,
            text: el.text,
            date: el.date,
            unread: el.unread,
          };
        })
      );
      dispatch(messagesActionCreator.setSent(sentMessages));
    } catch (e) {
      console.log(e);
    }
  },
  getReceived: (username: string) => async (dispatch: AppDispatch) => {
    try {
      const result = await api.post('/messages/received', {
        username,
      });
      const receivedMessages = sortByCreation(
        result.data.map((el: IApiMessage) => {
          return {
            id: el._id as string,
            sender: el.sender,
            recipient: el.recipient,
            theme: el.theme,
            text: el.text,
            date: el.date,
            unread: el.unread,
          };
        })
      );
      dispatch(messagesActionCreator.setReceived(receivedMessages));
    } catch (e) {
      console.log(e);
    }
  },
  sendMessage: (message: ISendingMessage) => async () => {
    try {
      const result = await api.post('/messages/create', {
        sender: message.sender,
        recipient: message.recipient,
        theme: message.theme,
        text: message.text,
        date: new Date(),
      });
      return result.data;
    } catch (e) {
      console.log(e);
    }
  },
  readMessage: (id: string) => async () => {
    try {
      await api.patch(`/messages/${id}`);
    } catch (e) {
      console.log(e);
    }
  },
};
