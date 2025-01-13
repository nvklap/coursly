import {
	GET_COURSES,
	CREATE_COURSE,
	REMOVE_COURSE,
	UPDATE_COURSE,
} from './actionTypes';
import type { Course } from '../../types/interfaces';

export const getCourses = (
	courses: Course[]
): { type: string; payload: Course[] } => {
	return { type: GET_COURSES, payload: courses };
};

export const createCourse = (
	course: Course
): { type: string; payload: Course } => {
	return { type: CREATE_COURSE, payload: course };
};

export const removeCourse = (id: string): { type: string; payload: string } => {
	return { type: REMOVE_COURSE, payload: id };
};

export const updateCourse = (
	course: Course
): { type: string; payload: Course } => {
	return { type: UPDATE_COURSE, payload: course };
};
