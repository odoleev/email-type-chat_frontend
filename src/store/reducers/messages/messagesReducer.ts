import { IMessagesState, MessagesActions, MessagesActionsEnum } from './types';

const initialState: IMessagesState = {
  sentMessages: [],
  receivedMessages: [],
};

export function messagesReducer(
  state = initialState,
  action: MessagesActions
): IMessagesState {
  switch (action.type) {
    case MessagesActionsEnum.SET_SENT:
      return { ...state, sentMessages: action.payload };
    case MessagesActionsEnum.SET_RECEIVED:
      return { ...state, receivedMessages: action.payload };
    case MessagesActionsEnum.CLEAR_SENT:
      return { ...state, sentMessages: [] };
    case MessagesActionsEnum.CLEAR_RECEIVED:
      return { ...state, receivedMessages: [] };
    default:
      return state;
  }
}
