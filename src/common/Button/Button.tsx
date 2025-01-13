import classes from './Button.module.css';

export const Button: React.FC<{
	buttonText: string;
	className?: string;
	onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
	type?: 'button' | 'submit' | 'reset' | undefined;
}> = ({ className, onClick, type = 'button', buttonText }) => (
	<button
		className={`${classes.button} ${className ?? ''}`}
		onClick={onClick}
		type={type}
	>
		{buttonText}
	</button>
);
