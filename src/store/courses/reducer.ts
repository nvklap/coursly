import type { AnyAction } from 'redux';

import {
	GET_COURSES,
	CREATE_COURSE,
	REMOVE_COURSE,
	UPDATE_COURSE,
} from './actionTypes';
import type { Course } from '../../types/interfaces';

export const coursesInitialState: Course[] = [];

export const coursesReducer = (
	state = coursesInitialState,
	action: AnyAction
): Course[] => {
	switch (action.type) {
		case GET_COURSES:
			return [...action.payload];

		case CREATE_COURSE:
			return [...state, action.payload];

		case UPDATE_COURSE:
			const updatedCourseIndex: number = state.findIndex(
				(course: Course): boolean => course.id === action.payload.id
			);
			return [
				...state.slice(0, updatedCourseIndex),
				action.payload,
				...state.slice(updatedCourseIndex + 1),
			];

		case REMOVE_COURSE:
			return state.filter((course) => course.id !== action.payload);
		default:
			return state;
	}
};
