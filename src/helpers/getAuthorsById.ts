import type { Author } from '../types/interfaces';

export const getAuthorsById = (
	ids: string[],
	authorsList: Author[]
): (Author | undefined)[] => {
	const authors = ids.map((id) => {
		return authorsList.find((author) => author.id === id);
	});
	return authors;
};
