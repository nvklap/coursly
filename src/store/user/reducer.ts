import type { AnyAction } from 'redux';

import { LOGIN, LOGOUT, GET_USER, SET_USER_ISLOADING } from './actionTypes';
import type { UserState } from '../../types/interfaces';

const userInitialState: UserState = {
	isAuth: false,
	isLoading: false,
	name: '',
	email: '',
	token: '',
	role: '',
};

export const userReducer = (
	state = userInitialState,
	action: AnyAction
): UserState => {
	switch (action.type) {
		case SET_USER_ISLOADING:
			return { ...state, isLoading: true };
		case LOGIN:
			return { isAuth: true, ...action.payload };
		case LOGOUT:
			return { ...userInitialState };
		case GET_USER:
			return { isAuth: true, ...action.payload };
		default:
			return state;
	}
};
