import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../store';

import classes from './Header.module.css';

import { Logo } from '..';
import { Button } from '../../common';
import { BUTTON_TEXT_LOGOUT } from '../../constants';
import { useUser } from '../../store/selectors';
import { logoutThunk } from '../../store/user/thunk';

export const Header: React.FC = () => {
	const dispatch = useAppDispatch();
	const { name: userName, isAuth } = useSelector(useUser);

	const handleLogout = (): void => {
		const token = localStorage.getItem('userToken');
		if (token) {
			dispatch(logoutThunk(token));
		}
	};

	return (
		<header className={classes.header}>
			<Logo />
			{isAuth && (
				<>
					<p className={classes.username}>{userName}</p>
					<Button buttonText={BUTTON_TEXT_LOGOUT} onClick={handleLogout} />
				</>
			)}
		</header>
	);
};
