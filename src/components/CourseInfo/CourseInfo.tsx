import { useState, useEffect, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../store';

import classes from './CourseInfo.module.css';

import { pipeDuration, getAuthorsById } from '../../helpers';
import { useAuthors } from '../../store/selectors';
import { getAuthorsThunk } from '../../store/authors/thunk';
import { getCourse } from '../../services';
import type { Course } from '../../types/interfaces';
import { Loader } from '../../common';

export const CourseInfo: React.FC = () => {
	const dispatch = useAppDispatch();
	const [course, setCourse] = useState<Course>();
	const [isLoading, setCourseIsLoading] = useState<boolean>(false);
	const { authorsList, isLoading: isAuthorsListLoading } =
		useSelector(useAuthors);
	const { courseId } = useParams<string>();

	useEffect(() => {
		if (!authorsList.length) {
			dispatch(getAuthorsThunk());
		}
	}, [dispatch, authorsList]);

	useEffect(() => {
		if (courseId) {
			setCourseIsLoading(true);
			getCourse(courseId).then((data) => {
				setCourseIsLoading(false);
				if (data.successful) {
					setCourse(data.result);
				}
			});
		}
	}, [courseId]);

	const renderedCourseInfo: JSX.Element = useMemo(() => {
		if (course) {
			const { title, description, id, duration, creationDate, authors } = {
				...course,
			};

			const renderedAuthors: JSX.Element[] = getAuthorsById(
				authors,
				authorsList
			).map((author) => <div key={author?.id}>{author?.name}</div>);

			return (
				<article className={classes['course-info']}>
					<h2 className={classes['course-info__title']}>{title}</h2>
					<div className={classes['course-info__description']}>
						{description}
					</div>
					<div className={classes['course-info__info']}>
						<div className={classes['course-info__author']}>
							<span>ID: </span>
							{id}
						</div>
						<div>
							<span>Duration:</span> {pipeDuration(duration)}
						</div>
						<div>
							<span>Created:</span> {creationDate}
						</div>
						<div className={classes['course-info__authors']}>
							<span>Authors: </span>
							{renderedAuthors}
						</div>
					</div>
				</article>
			);
		}

		return <p>No course found...</p>;
	}, [authorsList, course]);

	if (isLoading || isAuthorsListLoading) return <Loader />;

	return (
		<section className={classes['course-wrapper']}>
			<Link to='/courses'> &lt; Back to courses</Link>

			{renderedCourseInfo}
		</section>
	);
};
