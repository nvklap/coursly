import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import { CourseCard } from '../CourseCard';
import { mockedState, mockedCourse } from '../../../../../mockedData';
import { getAuthorsNamesById, pipeDuration } from '../../../../../helpers';

describe('CourseCard component', () => {
	const mockedStore = {
		getState: () => mockedState,
		subscribe: jest.fn(),
		dispatch: jest.fn(),
		replaceReducer: jest.fn(),
		[Symbol.observable]: jest.fn(),
	};

	const authorsList = mockedStore.getState().authors;
	const { id, title, description, authors, duration, creationDate } =
		mockedCourse;

	beforeEach(() => {
		render(
			<Provider store={mockedStore}>
				<BrowserRouter>
					<CourseCard
						key={id}
						id={id}
						title={title}
						description={description}
						authors={getAuthorsNamesById(authors, authorsList)}
						duration={pipeDuration(duration)}
						creationDate={creationDate}
					/>
				</BrowserRouter>
			</Provider>
		);
	});

	test('should render title', () => {
		const courseTitle = screen.getByText(title);

		expect(courseTitle).toBeInTheDocument();
	});

	test('should render description', () => {
		const courseDescription = screen.getByText(description);

		expect(courseDescription).toBeInTheDocument();
	});

	test('should render duration', () => {
		const courseDuration = screen.getByText(pipeDuration(duration));

		expect(courseDuration).toBeInTheDocument();
	});

	test('should render authors list', () => {
		const authorsElement = screen.getByText(
			getAuthorsNamesById(authors, authorsList)
		);

		expect(authorsElement).toBeInTheDocument();
	});

	test('should render created date in the correct format.', () => {
		const creationDateElement = screen.getByText(creationDate);

		expect(creationDateElement).toContainHTML('8/3/2021');
	});
});
