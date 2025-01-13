import { useEffect } from 'react';
import { useNavigate, useRouteError } from 'react-router-dom';
import { useSelector } from 'react-redux';

import classes from './ErrorBoundary.module.css';

import { useUser } from '../../store/selectors';

export const ErrorBoundary = (): JSX.Element => {
	const navigate = useNavigate();
	const error = useRouteError() as Error;
	const { isAuth } = useSelector(useUser);

	useEffect(() => {
		if (!isAuth) {
			navigate('/');
		}
	}, [isAuth, navigate]);

	return (
		<section className={classes['section-wrapper']}>
			<h1>Oops...</h1>
			<p>{error.message}</p>
			<p>Check connection to the server</p>
		</section>
	);
};
