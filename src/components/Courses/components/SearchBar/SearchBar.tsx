import { useState } from 'react';

import classes from './SearchBar.module.css';

import {
	BUTTON_TEXT_SEARCH,
	PLACEHOLDER_TEXT_SEARCH,
} from '../../../../constants';
import { Button, Input } from '../../../../common';

export const SearchBar: React.FC<{
	onSubmitSearch: (query: string) => void;
}> = ({ onSubmitSearch }) => {
	const [searchValue, setSearchValue] = useState<string>('');

	const handleSearchInput: (e: React.ChangeEvent<HTMLInputElement>) => void = ({
		target: { value },
	}) => {
		if (value.trim() === '') {
			onSubmitSearch(value);
		}

		setSearchValue(value);
	};

	const handleSearchSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		onSubmitSearch(searchValue);
	};

	return (
		<form className={classes['search-form']}>
			<Input
				type='search'
				name='search'
				id='search'
				placeholderText={PLACEHOLDER_TEXT_SEARCH}
				onChange={handleSearchInput}
			/>
			<Button
				type='submit'
				buttonText={BUTTON_TEXT_SEARCH}
				onClick={handleSearchSubmit}
			/>
		</form>
	);
};
