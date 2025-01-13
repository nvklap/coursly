import { AnyAction, Dispatch } from 'redux';
import type { ThunkAction } from 'redux-thunk';

import { RootState } from '../index';
import type { User } from '../../types/interfaces';
import { auth, logoutUser, fetchUser } from '../../services';
import { login, logout, getUser } from './actionCreators';
import { ROLES } from '../../constants';

export const loginThunk =
	(
		url: string,
		userData: User
	): ThunkAction<void, RootState, unknown, AnyAction> =>
	async (dispatch: Dispatch): Promise<void> => {
		const result = await auth(url, userData);

		if (result && result.user && result.successful) {
			const user = {
				token: result.result,
				name: result.user.name,
				email: result.user.email,
				role: result.user.name ? ROLES.USER : ROLES.ADMIN,
			};

			localStorage.setItem('userToken', `${result.result}`);
			dispatch(login(user));
		}
	};

export const logoutThunk =
	(token: string): ThunkAction<void, RootState, unknown, AnyAction> =>
	(dispatch: Dispatch): void => {
		logoutUser(token);

		localStorage.removeItem('userToken');
		dispatch(logout());
	};

export const getUserThunk =
	(token: string): ThunkAction<void, RootState, unknown, AnyAction> =>
	async (dispatch: Dispatch): Promise<void> => {
		const response = await fetchUser(token);
		if (response.result) {
			localStorage.setItem('userName', `${response.result.name}`);
			dispatch(getUser(response.result));
		}
	};
