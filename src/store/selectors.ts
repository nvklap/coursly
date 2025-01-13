import type { RootState } from './';
import type { Author, Course, UserState } from '../types/interfaces';

export const useAuthors = (state: RootState): Author[] => state.authors;
export const useCourses = (state: RootState): Course[] => state.courses;
export const useUser = (state: RootState): UserState => state.user;
