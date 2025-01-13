import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import classes from './Registration.module.css';

import { Input, Button } from '../../common';
import {
	LABEL_TEXT_NAME,
	LABEL_TEXT_EMAIL,
	LABEL_TEXT_PASSWORD,
	PLACEHOLDER_TEXT_NAME,
	PLACEHOLDER_TEXT_EMAIL,
	PLACEHOLDER_TEXT_PASSWORD,
	BUTTON_TEXT_REGISTRATION,
} from '../../constants';
import { isTextInputValid } from '../../helpers';
import { auth } from '../../services';
import type { AuthResponse, User } from '../../types/interfaces';
import { API_ENDPOINTS } from '../../constants';

export const Registration: React.FC = () => {
	const navigate = useNavigate();

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

			const result: AuthResponse | undefined = await auth(
				API_ENDPOINTS.REGISTRATION,
				newUser
			);

			result?.successful ? navigate('/login') : alert(result?.error);
		} else {
			alert('Please, fill in all fields');
		}
	};

	return (
		<section className={classes.wrapper}>
			<h1 className={classes.title}>Registration</h1>
			<form className={classes.form} onSubmit={handleFormSubmit}>
				<div className={classes['form-group']}>
					<Input
						type='text'
						labelText={LABEL_TEXT_NAME}
						placeholderText={PLACEHOLDER_TEXT_NAME}
						name='name'
						id='name'
						onChange={handleNameInput}
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
					/>
				</div>
				<div className={classes['form-action']}>
					<Button type='submit' buttonText={BUTTON_TEXT_REGISTRATION} />
				</div>
			</form>
			<p className={classes.note}>
				If you have an account you can <Link to='/login'>Login</Link>
			</p>
		</section>
	);
};
