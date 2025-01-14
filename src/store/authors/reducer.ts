import { AnyAction } from 'redux';

import type { AuthorsState } from '../../types/interfaces';
import { GET_AUTHORS, ADD_AUTHOR, SET_AUTHOR_ISLOADING } from './actionTypes';

const authorsInitialState: AuthorsState = {
	isLoading: false,
	authorsList: [],
};

export const authorsReducer = (
	state = authorsInitialState,
	action: AnyAction
): AuthorsState => {
	switch (action.type) {
		case SET_AUTHOR_ISLOADING:
			return { ...state, isLoading: true };
		case GET_AUTHORS:
			return { ...state, isLoading: false, authorsList: [...action.payload] };
		case ADD_AUTHOR:
			return {
				...state,
				isLoading: false,
				authorsList: [...state.authorsList, action.payload],
			};
		default:
			return state;
	}
};
