import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../../../store';

import classes from './CourseCard.module.css';

import { Button } from '../../../../common';
import { BUTTON_TEXT_SHOW_COURSE, ROLES } from '../../../../constants';
import { useUser } from '../../../../store/selectors';
import { removeCourseThunk } from '../../../../store/courses/thunk';

export const CourseCard: React.FC<{
	id: string;
	title: string;
	description: string;
	authors: string;
	duration: string;
	creationDate: string;
}> = ({ id, title, description, authors, duration, creationDate }) => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const { isAuth, role } = useSelector(useUser);
	const userToken = localStorage.getItem('userToken');

	const handleRemoveCourse = (): void => {
		if (userToken) {
			dispatch(removeCourseThunk(id, userToken));
		}
	};

	const handleUpdateCourse = (): void => {
		navigate(`/courses/update/${id}`);
	};

	return (
		<article className={classes['course-card']} data-testid='course-card'>
			<h2 className={classes['course-card__title']}>{title}</h2>
			<p className={classes['course-card__description']}>{description}</p>
			<div className={classes['course-card__info']}>
				<p className={classes['course-card__author']}>
					<span>Authors: </span>
					{authors}
				</p>
				<p>
					<span>Duration:</span> {duration}
				</p>
				<p>
					<span>Created:</span> {creationDate}
				</p>
			</div>
			<div className={classes['course-card__btns-wrapper']}>
				<Link
					className={classes['course-card__btn-show']}
					to={`/courses/${id}`}
				>
					<Button buttonText={BUTTON_TEXT_SHOW_COURSE} />
				</Link>
				{isAuth && role === ROLES.ADMIN && (
					<>
						<Button
							className={classes['course-card__btn-icon']}
							buttonText='&#9998;'
							onClick={handleUpdateCourse}
						/>
						<Button
							className={classes['course-card__btn-icon']}
							buttonText='&#128465;'
							onClick={handleRemoveCourse}
						/>
					</>
				)}
			</div>
		</article>
	);
};
