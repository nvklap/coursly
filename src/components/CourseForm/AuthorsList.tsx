import { useMemo } from 'react';

import classes from './CourseForm.module.css';

import type { Author } from '../../types/interfaces';
import { Button } from '../../common';

export const AuthorsList: React.FC<{
	onChangeAuthorList: (id: string) => void;
	authorsList: Author[];
	buttonText: string;
	authorsId?: string;
	authorItemId?: string;
}> = ({
	authorsList,
	onChangeAuthorList,
	buttonText,
	authorItemId,
	authorsId,
}) => {
	const renderedAuthorsList: JSX.Element = useMemo(() => {
		if (authorsList.length === 0) {
			return <p>No authors found!</p>;
		}

		return (
			<ul className={classes['authors-list']}>
				{authorsList.map((author) => (
					<li
						className={classes['authors-item']}
						key={author.id}
						data-testid={authorItemId}
					>
						<span className={classes['authors-name']}>{author.name}</span>
						<Button
							type='button'
							buttonText={buttonText}
							onClick={onChangeAuthorList.bind(null, author.id)}
						/>
					</li>
				))}
			</ul>
		);
	}, [authorsList, buttonText, onChangeAuthorList, authorItemId]);

	return (
		<fieldset className={classes['form-fieldset']} data-testid={authorsId}>
			<legend className={classes['form-legend']}>Authors</legend>
			{renderedAuthorsList}
		</fieldset>
	);
};
