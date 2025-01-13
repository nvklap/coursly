import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../store';

import classes from './Courses.module.css';

import { Button } from '../../common';
import { CourseCard, SearchBar } from '..';
import { BUTTON_TEXT_ADD_COURSE, ROLES } from '../../constants';
import { pipeDuration, getAuthorsNamesById } from '../../helpers';
import { useCourses, useAuthors, useUser } from '../../store/selectors';
import { getCoursesThunk } from '../../store/courses/thunk';
import { getAuthorsThunk } from '../../store/authors/thunk';
import type { Course } from '../../types/interfaces';

export const Courses: React.FC = () => {
	const dispatch = useAppDispatch();
	const coursesList = useSelector(useCourses);
	const authorsList = useSelector(useAuthors);
	const { isAuth, role } = useSelector(useUser);
	const [searchInput, setSearchInput] = useState<string>('');

	const handleSearchSubmit = (query: string): void => {
		setSearchInput(query.toLowerCase());
	};

	const renderedfilteredCourses: JSX.Element | JSX.Element[] = useMemo(() => {
		if (!coursesList.length) {
			return <></>;
		}

		const filteredCourses: Course[] = coursesList.filter(
			({ id, title }) =>
				title.toLowerCase().includes(searchInput) ||
				id.toLowerCase().includes(searchInput)
		);

		return filteredCourses.map(
			({ id, title, description, authors, duration, creationDate }) => {
				return (
					<CourseCard
						id={id}
						key={id}
						title={title}
						description={description}
						authors={getAuthorsNamesById(authors, authorsList)}
						duration={pipeDuration(duration)}
						creationDate={creationDate}
					/>
				);
			}
		);
	}, [authorsList, coursesList, searchInput]);

	useEffect(() => {
		dispatch(getAuthorsThunk());
		dispatch(getCoursesThunk());
	}, [dispatch]);

	return (
		<section className={classes.courses}>
			<div className={classes['courses-header']}>
				<SearchBar onSubmitSearch={handleSearchSubmit} />
				{isAuth && role === ROLES.ADMIN && (
					<Link to={`/courses/add`}>
						<Button buttonText={BUTTON_TEXT_ADD_COURSE} />
					</Link>
				)}
			</div>
			<div data-testid='courses-container'>{renderedfilteredCourses}</div>
		</section>
	);
};
