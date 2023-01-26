import { IUsers } from '../../../types/users.types';

export interface IUsersState {
  username: string;
  users: IUsers;
}

export enum UsersActionsEnum {
  SET_USERNAME = 'SET_USERNAME',
  SET_USERS = 'SET_USERS',
  CLEAR_USERS_AND_USERNAME = 'CLEAR',
}

export interface ISetUsernameAction {
  type: UsersActionsEnum.SET_USERNAME;
  payload: string;
}

export interface ISetUsersAction {
  type: UsersActionsEnum.SET_USERS;
  payload: IUsers;
}

export interface IClearAllAction {
  type: UsersActionsEnum.CLEAR_USERS_AND_USERNAME;
}

export type UsersAction =
  | ISetUsersAction
  | ISetUsernameAction
  | IClearAllAction;
