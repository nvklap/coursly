import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import { Header } from '../Header';
import { mockedState } from '../../../mockedData';

describe('Header component', () => {
	const mockedStore = {
		getState: () => mockedState,
		subscribe: jest.fn(),
		dispatch: jest.fn(),
		replaceReducer: jest.fn(),
		[Symbol.observable]: jest.fn(),
	};

	beforeEach(() => {
		render(
			<Provider store={mockedStore}>
				<Header />
			</Provider>
		);
	});

	test('should render logo', () => {
		const logoImg = screen.getByAltText('Logo');

		expect(logoImg).toBeInTheDocument();
	});

	test(`should render user's name`, () => {
		const userName = screen.getByText('Test Name');

		expect(userName).toBeInTheDocument();
	});
});
