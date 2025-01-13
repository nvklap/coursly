import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';

import { CourseForm } from '../CourseForm';
import {
	BUTTON_TEXT_CREATE_AUTHOR,
	BUTTON_TEXT_ADD_AUTHOR,
	BUTTON_TEXT_REMOVE_AUTHOR,
} from '../../../constants';
import { mockedState } from '../../../mockedData';

describe('CourseForm component', () => {
	const mockedStore = {
		getState: () => mockedState,
		subscribe: jest.fn(),
		dispatch: jest.fn(),
		replaceReducer: jest.fn(),
		[Symbol.observable]: jest.fn(),
	};
	const authors = mockedStore.getState().authors;
	beforeEach(() => {
		render(
			<Provider store={mockedStore}>
				<BrowserRouter>
					<CourseForm />
				</BrowserRouter>
			</Provider>
		);
	});

	test('should show authors lists (all and course authors)', () => {
		const authorItems = screen.getAllByTestId('authors-all-item');
		const authorCourseItems = screen.getByTestId('authors-course');

		expect(authorItems).toHaveLength(authors.length);
		expect(authorCourseItems).toBeInTheDocument();
	});

	test('should call dispatch after a click on a button "Create author"', async () => {
		fireEvent.click(screen.getByText(BUTTON_TEXT_CREATE_AUTHOR));

		await waitFor((): void => expect(mockedStore.dispatch).toHaveBeenCalled());
	});

	test('should add an author to course authors list after a click on a button "Add author"', () => {
		fireEvent.click(screen.getAllByText(BUTTON_TEXT_ADD_AUTHOR)[0]);

		expect(screen.getAllByText(BUTTON_TEXT_REMOVE_AUTHOR)).toHaveLength(1);
	});

	test('should delete an author from the course list after a click on a button "Delete author"', () => {
		fireEvent.click(screen.getAllByText(BUTTON_TEXT_ADD_AUTHOR)[0]);
		expect(screen.getAllByText(BUTTON_TEXT_REMOVE_AUTHOR)).toHaveLength(1);

		fireEvent.click(screen.getAllByText(BUTTON_TEXT_REMOVE_AUTHOR)[0]);
		expect(screen.queryAllByTestId('authors-course-item')).toHaveLength(0);
	});
});
