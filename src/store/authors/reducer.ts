import { AnyAction } from 'redux';

import type { Author } from '../../types/interfaces';
import { GET_AUTHORS, ADD_AUTHOR } from './actionTypes';

const authorsInitialState: Author[] = [];

export const authorsReducer = (
	state = authorsInitialState,
	action: AnyAction
): Author[] => {
	switch (action.type) {
		case GET_AUTHORS:
			return [...action.payload];
		case ADD_AUTHOR:
			return [...state, action.payload];
		default:
			return state;
	}
};
