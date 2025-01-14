import type { RootState } from './';
import type {
	AuthorsState,
	CoursesState,
	UserState,
} from '../types/interfaces';

export const useAuthors = (state: RootState): AuthorsState => state.authors;
export const useCourses = (state: RootState): CoursesState => state.courses;
export const useUser = (state: RootState): UserState => state.user;
