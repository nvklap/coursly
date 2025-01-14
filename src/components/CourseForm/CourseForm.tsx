import { useState, useCallback, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../store';

import classes from './CourseForm.module.css';

import {
	BUTTON_TEXT_ADD_AUTHOR,
	BUTTON_TEXT_REMOVE_AUTHOR,
	PLACEHOLDER_TEXT_TITLE,
	PLACEHOLDER_TEXT_DESCRIPTION,
	PLACEHOLDER_TEXT_AUTHOR,
	PLACEHOLDER_TEXT_DURATION,
	LABEL_TEXT_TITLE,
	LABEL_TEXT_AUTHOR,
	LABEL_TEXT_DESCRIPTION,
	LABEL_TEXT_DURATION,
	BUTTON_TEXT_CREATE_AUTHOR,
	BUTTON_TEXT_UPDATE_COURSE,
	BUTTON_TEXT_CREATE_COURSE,
} from '../../constants';
import { Button, Input, Loader } from '../../common';
import { AuthorsList } from '..';
import { isTextInputValid, pipeDuration } from '../../helpers';
import { useAuthors, useCourses } from '../../store/selectors';
import { addAuthorThunk, getAuthorsThunk } from '../../store/authors/thunk';
import {
	createCourseThunk,
	updateCourseThunk,
	getCoursesThunk,
} from '../../store/courses/thunk';
import type { Author, Course } from '../../types/interfaces';

export const CourseForm: React.FC = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const { courseId } = useParams();
	const token = localStorage.getItem('userToken');
	const { coursesList, isLoading: isCoursesListLoading } =
		useSelector(useCourses);
	const { authorsList: authorsListStore, isLoading: isAuthorsListLoading } =
		useSelector(useAuthors);
	const updatedCourse = coursesList.find(({ id }) => id === courseId);

	const [authorsList, setAuthorsList] = useState<Author[]>([]);
	const [authorsCourseList, setAuthorsCourseList] = useState<Author[]>([]);
	const [isAuthorsCourseListSet, setIsAuthorsCourseListSet] =
		useState<boolean>(false);
	const [authorValue, setAuthorValue] = useState<string>('');
	const [titleValue, setTitleValue] = useState<string>('');
	const [durationValue, setDurationValue] = useState<string>('');
	const [descriptionValue, setDescriptionValue] = useState<string>('');

	const isFormValid: boolean =
		isTextInputValid(titleValue) &&
		isTextInputValid(descriptionValue) &&
		authorsCourseList.length > 0 &&
		durationValue.length > 0;

	const buttonSubmitText = courseId
		? BUTTON_TEXT_UPDATE_COURSE
		: BUTTON_TEXT_CREATE_COURSE;

	useEffect(() => {
		dispatch(getCoursesThunk());
		dispatch(getAuthorsThunk());
	}, [dispatch]);

	useEffect(() => {
		setAuthorsList(
			authorsListStore.filter(
				(author) =>
					!authorsCourseList.some(
						(authorCourse) => authorCourse.id === author.id
					)
			)
		);
	}, [authorsListStore, authorsCourseList]);

	useEffect(() => {
		if (updatedCourse) {
			setTitleValue(updatedCourse.title);
			setDescriptionValue(updatedCourse.description);
			setDurationValue(updatedCourse.duration.toString());
		}
	}, [updatedCourse]);

	useEffect(() => {
		if (updatedCourse && !isAuthorsCourseListSet) {
			setAuthorsCourseList(
				authorsListStore.filter((author) =>
					updatedCourse.authors.includes(author.id)
				)
			);
			setIsAuthorsCourseListSet(true);
		}
	}, [updatedCourse, authorsListStore, isAuthorsCourseListSet]);

	const handleTitleInput: (e: React.ChangeEvent<HTMLInputElement>) => void = ({
		target: { value },
	}) => {
		setTitleValue(value);
	};

	const handleDescriptionInput: (
		e: React.ChangeEvent<HTMLTextAreaElement>
	) => void = ({ target: { value } }) => {
		setDescriptionValue(value);
	};

	const handleDurationInput: (
		e: React.ChangeEvent<HTMLInputElement>
	) => void = ({ target: { value } }) => {
		setDurationValue(+value > 0 ? value : '');
	};

	const handleAuthorInput: (e: React.ChangeEvent<HTMLInputElement>) => void = ({
		target: { value },
	}) => {
		setAuthorValue(value);
	};

	const createAuthor = (): void => {
		if (isTextInputValid(authorValue)) {
			const newAuthor: Author = {
				id: '',
				name: authorValue,
			};
			if (token) {
				dispatch(addAuthorThunk(newAuthor, token));
				setAuthorValue('');
			}
		}
	};

	const addAuthorToCourse = useCallback(
		(id: string): void => {
			const selectedAuthor = authorsList.find((author) => author.id === id);
			if (selectedAuthor) {
				setAuthorsCourseList((prevState) => [...prevState, selectedAuthor]);
			}
		},
		[authorsList]
	);

	const removeAuthorFromCourse = useCallback(
		(id: string): void => {
			const filteredAuthors = authorsCourseList.filter(
				(author) => author.id !== id
			);
			setAuthorsCourseList(filteredAuthors);
		},
		[authorsCourseList]
	);

	const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
		e.preventDefault();

		if (isFormValid) {
			const course: Course = {
				id: courseId ?? '',
				title: titleValue,
				description: descriptionValue,
				creationDate: new Date().toLocaleDateString('en-GB'),
				duration: +durationValue,
				authors: authorsCourseList.map(({ id }) => id),
			};

			// Create Course
			if (!courseId && token) {
				dispatch(createCourseThunk(course, token));
			}

			// Update Course
			if (courseId && token && updatedCourse) {
				dispatch(updateCourseThunk(course, token, courseId));
			}

			navigate('/courses');
		} else {
			alert('Please, fill in all fields');
		}
	};

	if (isAuthorsListLoading || isCoursesListLoading) {
		return <Loader />;
	}

	return (
		<form className={classes.form} onSubmit={handleFormSubmit}>
			<div className={classes.wrapper}>
				<div className={classes['form-group']}>
					<Input
						type='text'
						labelText={LABEL_TEXT_TITLE}
						placeholderText={PLACEHOLDER_TEXT_TITLE}
						name='course-title'
						id='course-title'
						onChange={handleTitleInput}
						value={titleValue}
					/>
				</div>
				<Button type='submit' buttonText={buttonSubmitText} />
			</div>
			<div className={classes['form-group']}>
				<label htmlFor='course-description'>{LABEL_TEXT_DESCRIPTION}</label>
				<textarea
					className={classes.textarea}
					id='course-description'
					name='course-description'
					placeholder={PLACEHOLDER_TEXT_DESCRIPTION}
					rows={4}
					onChange={handleDescriptionInput}
					value={descriptionValue}
				></textarea>
			</div>
			<div className={classes['form-authors']}>
				<fieldset className={classes['form-fieldset']}>
					<legend className={classes['form-legend']}>Add Author</legend>
					<div className={classes['form-group']}>
						<Input
							type='text'
							labelText={LABEL_TEXT_AUTHOR}
							placeholderText={PLACEHOLDER_TEXT_AUTHOR}
							name='course-author'
							id='course-author'
							onChange={handleAuthorInput}
							value={authorValue}
						/>
						<Button
							type='button'
							buttonText={BUTTON_TEXT_CREATE_AUTHOR}
							onClick={createAuthor}
						/>
					</div>
				</fieldset>
				<AuthorsList
					authorsList={authorsList}
					onChangeAuthorList={addAuthorToCourse}
					buttonText={BUTTON_TEXT_ADD_AUTHOR}
					authorItemId='authors-all-item'
				/>
				<fieldset className={classes['form-fieldset']}>
					<legend className={classes['form-legend']}>Duration</legend>
					<div className={classes['form-group']}>
						<Input
							type='number'
							labelText={LABEL_TEXT_DURATION}
							placeholderText={PLACEHOLDER_TEXT_DURATION}
							name='course-duration'
							id='course-duration'
							onChange={handleDurationInput}
							value={durationValue}
						/>
						<div className={classes.duration}>
							Duration:
							<span>
								{durationValue === ''
									? '00:00 hours'
									: pipeDuration(+durationValue)}
							</span>
						</div>
					</div>
				</fieldset>
				<AuthorsList
					authorsList={authorsCourseList}
					onChangeAuthorList={removeAuthorFromCourse}
					buttonText={BUTTON_TEXT_REMOVE_AUTHOR}
					authorsId='authors-course'
					authorItemId='authors-course-item'
				/>
			</div>
		</form>
	);
};
