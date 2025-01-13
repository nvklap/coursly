import { AnyAction, Dispatch } from 'redux';
import type { ThunkAction } from 'redux-thunk';

import { RootState } from '../index';
import { getList, addAuthorRequest } from '../../services';
import { Author } from '../../types/interfaces';
import { getAuthors, addAuthor } from './actionCreators';
import { API_ENDPOINTS } from '../../constants';

export const getAuthorsThunk =
	(): ThunkAction<void, RootState, unknown, AnyAction> =>
	async (dispatch: Dispatch): Promise<void> => {
		const result = await getList<Author>(API_ENDPOINTS.AUTHORS);
		if (result) {
			dispatch(getAuthors(result));
		}
	};

export const addAuthorThunk =
	(
		author: Author,
		token: string
	): ThunkAction<void, RootState, unknown, AnyAction> =>
	async (dispatch: Dispatch): Promise<void> => {
		const response = await addAuthorRequest(author, token);

		if (response.successful) {
			dispatch(addAuthor(response.result));
		}
	};
