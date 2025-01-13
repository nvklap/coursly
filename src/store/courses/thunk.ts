import { AnyAction, Dispatch } from 'redux';
import type { ThunkAction } from 'redux-thunk';

import { RootState } from '../index';
import {
	getList,
	createCourseRequest,
	updateCourseRequest,
	removeCourseRequest,
} from '../../services';
import type { Course } from '../../types/interfaces';
import {
	getCourses,
	createCourse,
	updateCourse,
	removeCourse,
} from './actionCreators';
import { API_ENDPOINTS } from '../../constants';

export const getCoursesThunk =
	(): ThunkAction<void, RootState, unknown, AnyAction> =>
	async (dispatch: Dispatch): Promise<void> => {
		const result = await getList<Course>(API_ENDPOINTS.COURSE);
		if (result) {
			dispatch(getCourses(result));
		}
	};

export const createCourseThunk =
	(
		course: Course,
		token: string
	): ThunkAction<void, RootState, unknown, AnyAction> =>
	async (dispatch: Dispatch): Promise<void> => {
		const response = await createCourseRequest(course, token);

		if (response.successful) {
			dispatch(createCourse(response.result));
		}
	};

export const updateCourseThunk =
	(
		course: Course,
		token: string,
		id: string
	): ThunkAction<void, RootState, unknown, AnyAction> =>
	async (dispatch: Dispatch): Promise<void> => {
		const response = await updateCourseRequest(course, token, id);

		if (response.successful) {
			dispatch(updateCourse(response.result));
		}
	};

export const removeCourseThunk =
	(
		id: string,
		token: string
	): ThunkAction<void, RootState, unknown, AnyAction> =>
	async (dispatch: Dispatch): Promise<void> => {
		const response = await removeCourseRequest(id, token);

		if (response.successful) {
			dispatch(removeCourse(id));
		}
	};
