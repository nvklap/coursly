import classes from './NotFound.module.css';

export const NotFound = (): JSX.Element => (
	<section className={classes['section-wrapper']}>
		<h1>Oops...</h1>
		<p>Page not found!</p>
	</section>
);
