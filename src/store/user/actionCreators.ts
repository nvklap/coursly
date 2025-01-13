import type { User } from '../../types/interfaces';
import { LOGIN, LOGOUT, GET_USER } from './actionTypes';

export const login = (user: User): { type: string; payload: User } => ({
	type: LOGIN,
	payload: user,
});

export const logout = (): { type: string } => ({ type: LOGOUT });

export const getUser = (user: User): { type: string; payload: User } => ({
	type: GET_USER,
	payload: user,
});
