import { userActionCreator } from './reducers/users/userActionCreator';
import { messagesActionCreator } from './reducers/messages/messagesActionCreator';

export const allActionsCreators = {
  ...userActionCreator,
  ...messagesActionCreator,
};
