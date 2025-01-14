import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// import { useSelector } from 'react-redux';

import classes from './Registration.module.css';

import { Input, Button, Loader } from '../../common';
import {
	LABEL_TEXT_NAME,
	LABEL_TEXT_EMAIL,
	LABEL_TEXT_PASSWORD,
	PLACEHOLDER_TEXT_NAME,
	PLACEHOLDER_TEXT_EMAIL,
	PLACEHOLDER_TEXT_PASSWORD,
	BUTTON_TEXT_REGISTRATION,
	BUTTON_TEXT_CREATING_USER,
} from '../../constants';
import { isTextInputValid } from '../../helpers';
import { auth } from '../../services';
import type { AuthResponse, User } from '../../types/interfaces';
import { API_ENDPOINTS } from '../../constants';
// import { useUser } from '../../store/selectors';

export const Registration: React.FC = () => {
	const navigate = useNavigate();
	// const { isLoading } = useSelector(useUser);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [userName, setUserName] = useState<string>('');
	const [userEmail, setUserEmail] = useState<string>('');
	const [userPassword, setUserPassword] = useState<string>('');

	const isFormValid: boolean =
		isTextInputValid(userName) &&
		isTextInputValid(userEmail) &&
		isTextInputValid(userPassword);

	const handleNameInput: (e: React.ChangeEvent<HTMLInputElement>) => void = ({
		target: { value },
	}) => {
		setUserName(value);
	};

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
			const newUser: User = {
				name: userName,
				password: userPassword,
				email: userEmail,
			};

			setIsLoading(true);

			const result: AuthResponse | undefined = await auth(
				API_ENDPOINTS.REGISTRATION,
				newUser
			);
			setIsLoading(false);
			result?.successful ? navigate('/login') : alert(result?.error);
		} else {
			alert('Please, fill in all fields');
		}
	};

	return (
		<section className={classes.wrapper}>
			<h1 className={classes.title}>Registration</h1>
			{isLoading && <Loader />}
			<form className={classes.form} onSubmit={handleFormSubmit}>
				<div className={classes['form-group']}>
					<Input
						type='text'
						labelText={LABEL_TEXT_NAME}
						placeholderText={PLACEHOLDER_TEXT_NAME}
						name='name'
						id='name'
						onChange={handleNameInput}
						disabled={isLoading}
					/>
				</div>
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
						buttonText={
							isLoading ? BUTTON_TEXT_CREATING_USER : BUTTON_TEXT_REGISTRATION
						}
					/>
				</div>
			</form>
			<p className={classes.note}>
				If you have an account you can <Link to='/login'>Login</Link>
			</p>
		</section>
	);
};
