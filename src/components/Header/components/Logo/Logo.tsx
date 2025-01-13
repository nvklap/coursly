import logo from '../../../../assets/logo.png';
import classes from './Logo.module.css';

export const Logo = (): JSX.Element => (
	<img src={logo} alt='Logo' className={classes.logo} />
);
