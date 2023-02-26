interface InputProps {
	onChange?: (event: React.ChangeEvent) => void;
	onBlur?: () => void;
	id: string;
	value?: string;
	autoFocus?: boolean;
	placeholder?: string;
	label?: string;
	className?: string;
}

function Input(props: InputProps) {
	const {
		onChange,
		onBlur,
		id,
		value,
		autoFocus,
		placeholder,
		label,
		className,
	} = props;

	return (
		<>
			{label ? (
				<label htmlFor={id} className='mr-2'>
					{label}
				</label>
			) : null}
			<input
				autoFocus={autoFocus}
				id={id}
				type='text'
				value={value}
				placeholder={placeholder}
				onChange={onChange}
				onBlur={onBlur}
				className={
					'shadow appearance-none border rounded py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' +
					' ' +
					className
				}
			/>
		</>
	);
}

export default Input;
