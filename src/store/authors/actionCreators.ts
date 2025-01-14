import { GET_AUTHORS, ADD_AUTHOR, SET_AUTHOR_ISLOADING } from './actionTypes';
import type { Author } from '../../types/interfaces';

export const getAuthors = (
	authors: Author[]
): { type: string; payload: Author[] } => ({
	type: GET_AUTHORS,
	payload: authors,
});

export const addAuthor = (
	author: Author
): { type: string; payload: Author } => {
	return { type: ADD_AUTHOR, payload: author };
};
export const setAuthorIsLoading = (): { type: string } => {
	return { type: SET_AUTHOR_ISLOADING };
};
