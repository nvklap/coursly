import fetchMock from 'jest-fetch-mock';

import {
	coursesReducer as reducer,
	coursesInitialState,
} from '../courses/reducer';
import { createCourse, getCourses } from '../courses/actionCreators';
import { mockedCoursesList, mockedCourse as course } from '../../mockedData';
import { getList } from '../../services';
import type { Course } from '../../types/interfaces';

describe('course reducer', () => {
	fetchMock.enableMocks();

	beforeEach(() => {
		fetchMock.resetMocks();
	});

	test('should return the initial state', () => {
		expect(reducer(undefined, { type: undefined })).toEqual(
			coursesInitialState
		);
	});

	test('should handle SAVE_COURSE and return new state', () => {
		const prevState = { isLoading: false, coursesList: mockedCoursesList };

		expect(reducer(prevState, createCourse(course))).toEqual({
			...prevState,
			coursesList: [...mockedCoursesList, course],
		});
	});

	test('should handle GET_COURSES and return new state', async () => {
		fetchMock.mockResponseOnce(
			JSON.stringify({
				successful: true,
				result: mockedCoursesList,
			})
		);

		const result = await getList<Course>('courses');

		if (result) {
			expect(reducer(coursesInitialState, getCourses(result))).toEqual({
				...coursesInitialState,
				coursesList: [...mockedCoursesList],
			});
		}
		expect(fetch).toHaveBeenCalledTimes(1);
	});
});
