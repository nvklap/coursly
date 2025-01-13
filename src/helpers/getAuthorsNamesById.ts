import type { Author } from '../types/interfaces';
import { getAuthorsById } from './getAuthorsById';

export const getAuthorsNamesById = (
	ids: string[],
	authorsList: Author[]
): string => {
	return getAuthorsById(ids, authorsList)
		.map((author) => author?.name)
		.join(', ');
};
