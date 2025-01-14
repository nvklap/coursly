import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../store/index';

import classes from './Login.module.css';

import { Input, Button, Loader } from '../../common';
import {
	LABEL_TEXT_EMAIL,
	LABEL_TEXT_PASSWORD,
	PLACEHOLDER_TEXT_EMAIL,
	PLACEHOLDER_TEXT_PASSWORD,
	BUTTON_TEXT_LOGIN,
	BUTTON_TEXT_LOGGIN_IN,
} from '../../constants';
import { isTextInputValid } from '../../helpers';
import { useUser } from '../../store/selectors';
import { loginThunk } from '../../store/user/thunk';
import type { User } from '../../types/interfaces';
import { API_ENDPOINTS } from '../../constants';

export const Login: React.FC = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const { isAuth, isLoading } = useSelector(useUser);

	const [userEmail, setUserEmail] = useState<string>('');
	const [userPassword, setUserPassword] = useState<string>('');

	useEffect(() => {
		if (isAuth) {
			navigate('/courses');
		}
	}, [isAuth, navigate]);

	const isFormValid: boolean =
		isTextInputValid(userEmail) && isTextInputValid(userPassword);

	const handleEmailInput: (e: React.ChangeEvent<HTMLInputElement>) => void = ({
		target: { value },
	}) => {
		setUserEmail(value);
	};

	const handlePasswordInput: (
		e: React.ChangeEvent<HTMLInputElement>
	) => void = ({ target: { value } }) => {
		setUserPassword(value);
	};

	const handleFormSubmit = async (e: React.FormEvent): Promise<void> => {
		e.preventDefault();

		if (isFormValid) {
			const userInfo: User = {
				password: userPassword,
				email: userEmail,
			};

			dispatch(loginThunk(API_ENDPOINTS.LOGIN, userInfo));
		} else {
			alert('Please, fill in all fields');
		}
	};

	return (
		<section className={classes.wrapper}>
			<h1 className={classes.title}>Login</h1>
			{isLoading && <Loader />}
			<form className={classes.form} onSubmit={handleFormSubmit}>
				<div className={classes['form-group']}>
					<Input
						type='email'
						labelText={LABEL_TEXT_EMAIL}
						placeholderText={PLACEHOLDER_TEXT_EMAIL}
						name='email'
						id='email'
						onChange={handleEmailInput}
						disabled={isLoading}
					/>
				</div>
				<div className={classes['form-group']}>
					<Input
						type='password'
						labelText={LABEL_TEXT_PASSWORD}
						placeholderText={PLACEHOLDER_TEXT_PASSWORD}
						name='password'
						id='password'
						onChange={handlePasswordInput}
						disabled={isLoading}
					/>
				</div>
				<div className={classes['form-action']}>
					<Button
						type='submit'
						buttonText={isLoading ? BUTTON_TEXT_LOGGIN_IN : BUTTON_TEXT_LOGIN}
					/>
				</div>
			</form>
			<p className={classes.note}>
				If you do not have an account you can{' '}
				<Link to='/registration'>Registration</Link>
			</p>
		</section>
	);
};
