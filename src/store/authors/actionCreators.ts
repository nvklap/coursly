import { GET_AUTHORS, ADD_AUTHOR } from './actionTypes';
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
