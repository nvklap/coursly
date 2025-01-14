import type { AnyAction } from 'redux';

import {
	GET_COURSES,
	CREATE_COURSE,
	REMOVE_COURSE,
	UPDATE_COURSE,
} from './actionTypes';
import type { Course, CoursesState } from '../../types/interfaces';

export const coursesInitialState: CoursesState = {
	isLoading: false,
	coursesList: [],
};

export const coursesReducer = (
	state = coursesInitialState,
	action: AnyAction
): CoursesState => {
	switch (action.type) {
		case GET_COURSES:
			return { ...state, isLoading: false, coursesList: [...action.payload] };

		case CREATE_COURSE:
			return {
				...state,
				isLoading: false,
				coursesList: [...state.coursesList, action.payload],
			};

		case UPDATE_COURSE:
			const updatedCourseIndex: number = state.coursesList.findIndex(
				(course: Course): boolean => course.id === action.payload.id
			);
			return {
				isLoading: false,
				coursesList: [
					...state.coursesList.slice(0, updatedCourseIndex),
					action.payload,
					...state.coursesList.slice(updatedCourseIndex + 1),
				],
			};

		case REMOVE_COURSE:
			return {
				isLoading: false,
				coursesList: state.coursesList.filter(
					(course) => course.id !== action.payload
				),
			};
		default:
			return state;
	}
};
