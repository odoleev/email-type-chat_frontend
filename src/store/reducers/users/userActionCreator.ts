import {
  IClearAllAction,
  ISetUsernameAction,
  ISetUsersAction,
  UsersActionsEnum,
} from './types';
import { AppDispatch } from '../../index';
import api from '../../../api/axiosClient';
import { IApiUser } from '../../../types/api.types';
import { IUsers } from '../../../types/users.types';

export const userActionCreator = {
  setUsername: (username: string): ISetUsernameAction => ({
    type: UsersActionsEnum.SET_USERNAME,
    payload: username,
  }),
  setUsers: (users: IUsers): ISetUsersAction => ({
    type: UsersActionsEnum.SET_USERS,
    payload: users,
  }),
  clearAll: (): IClearAllAction => ({
    type: UsersActionsEnum.CLEAR_USERS_AND_USERNAME,
  }),
  getUsers: () => async (dispatch: AppDispatch) => {
    try {
      const result = await api.get('/users');
      const users = result.data.map((el: IApiUser) => {
        return { username: el.username, id: el._id };
      });
      dispatch(userActionCreator.setUsers(users));
    } catch (e) {
      console.log(e);
    }
  },
  getUsername: (username: string) => async (dispatch: AppDispatch) => {
    try {
      const result = await api.post('/users', {
        username,
      });
      dispatch(userActionCreator.setUsername(result.data.username));
    } catch (e) {
      console.log(e);
    }
  },
};
