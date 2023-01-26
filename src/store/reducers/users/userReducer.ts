import { IUsersState, UsersActionsEnum, UsersAction } from './types';

const initialState: IUsersState = {
  username: '',
  users: [],
};

export function usersReducer(
  state = initialState,
  action: UsersAction
): IUsersState {
  switch (action.type) {
    case UsersActionsEnum.SET_USERS:
      return { ...state, users: action.payload };
    case UsersActionsEnum.SET_USERNAME:
      return { ...state, username: action.payload };
    case UsersActionsEnum.CLEAR_USERS_AND_USERNAME:
      return { ...state, users: [], username: '' };
    default:
      return state;
  }
}
