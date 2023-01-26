import { IMessages } from '../../../types/messages.types';

export interface IMessagesState {
  sentMessages: IMessages;
  receivedMessages: IMessages;
}

export enum MessagesActionsEnum {
  SET_SENT = 'SET_SENT',
  SET_RECEIVED = 'SET_RECEIVED',
  CLEAR_SENT = 'CLEAR_SENT',
  CLEAR_RECEIVED = 'CLEAR_RECEIVED',
}

export interface ISetSentAction {
  type: MessagesActionsEnum.SET_SENT;
  payload: IMessages;
}

export interface ISetReceivedAction {
  type: MessagesActionsEnum.SET_RECEIVED;
  payload: IMessages;
}

export interface IClearSentAction {
  type: MessagesActionsEnum.CLEAR_SENT;
}

export interface IClearReceivedAction {
  type: MessagesActionsEnum.CLEAR_RECEIVED;
}

export type MessagesActions =
  | ISetReceivedAction
  | ISetSentAction
  | IClearReceivedAction
  | IClearSentAction;
