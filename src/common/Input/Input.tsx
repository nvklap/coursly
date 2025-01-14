import classes from './Input.module.css';

export const Input: React.FC<{
	id: string;
	type: string;
	name: string;
	placeholderText: string;
	labelText?: string;
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
	value?: string;
	disabled?: boolean;
}> = ({
	labelText,
	id,
	onChange,
	type,
	placeholderText,
	name,
	value,
	disabled = false,
}) => (
	<>
		{labelText && <label htmlFor={id}>{labelText}</label>}
		<input
			className={classes.input}
			onChange={onChange}
			type={type}
			placeholder={placeholderText}
			name={name}
			id={id}
			value={value}
			disabled={disabled}
		/>
	</>
);
