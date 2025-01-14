import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

import { Courses } from '../Courses';
import { BUTTON_TEXT_ADD_COURSE } from '../../../constants';
import { mockedState, mockedEmptyState } from '../../../mockedData';
import type { StoreMocked } from '../../../types/mockedInterfaces';

describe('Course component', () => {
	const mockedStore = {
		getState: () => mockedState,
		subscribe: jest.fn(),
		dispatch: jest.fn(),
		replaceReducer: jest.fn(),
		[Symbol.observable]: jest.fn(),
	};

	const mockedEmptyStore = {
		getState: () => mockedEmptyState,
		subscribe: jest.fn(),
		dispatch: jest.fn(),
		replaceReducer: jest.fn(),
		[Symbol.observable]: jest.fn(),
	};

	const { coursesList: courses } = mockedStore.getState().courses;

	const createTree = (data: StoreMocked) =>
		render(
			<Provider store={data}>
				<BrowserRouter>
					<Courses />
				</BrowserRouter>
			</Provider>
		);

	test('should display amount of CourseCard equal length of courses array', () => {
		createTree(mockedStore);

		const cardElement = screen.getAllByTestId('course-card');
		expect(cardElement).toHaveLength(courses.length);
	});

	test('should display Empty container if courses array length is 0', () => {
		createTree(mockedEmptyStore);

		const coursesContainer = screen.getByTestId('courses-container');
		expect(coursesContainer).toBeEmptyDOMElement();
	});

	test('should render CourseForm after a click on a button "Add new course"', () => {
		createTree(mockedStore);

		const btnAddCourse = screen.getByText(BUTTON_TEXT_ADD_COURSE);
		fireEvent.click(btnAddCourse);

		expect(window.location.pathname).toBe('/courses/add');
	});
});
