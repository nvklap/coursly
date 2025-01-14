import type { User } from '../../types/interfaces';
import { LOGIN, LOGOUT, GET_USER, SET_USER_ISLOADING } from './actionTypes';

export const login = (user: User): { type: string; payload: User } => ({
	type: LOGIN,
	payload: user,
});

export const logout = (): { type: string } => ({ type: LOGOUT });

export const getUser = (user: User): { type: string; payload: User } => ({
	type: GET_USER,
	payload: user,
});

export const setUserIsLoading = (): { type: string } => ({
	type: SET_USER_ISLOADING,
});
