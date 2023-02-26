interface ButtonProps {
	onClick?: () => void;
	innerText: string;
	first?: boolean; // if button is first in a sequence of buttons, this removes ml-2
	disabled?: boolean;
	type?: string; // 'warning' - red
	className?: string;
}

function Button(props: ButtonProps) {
	const { onClick, innerText, first, disabled, type, className } = props;

	let bgColor = '';
	let hoverBgColor = '';

	switch (type) {
		case 'warning': {
			bgColor = 'bg-red-600';
			hoverBgColor = 'hover:bg-red-800';
			break;
		}
		default: {
			bgColor = 'bg-slate-500';
			hoverBgColor = 'hover:bg-slate-700';
			break;
		}
	}

	// NOTE: for some reason, using `hover:${hoverBgColor}`
	// or 'hover:' + hoverBgColor doesn't work
	const bgColorStyle = `${bgColor} ${hoverBgColor}` + ' ';
	const additionalStyles = className ? ' ' + className : '';

	const marginLeft = first ? '' : 'ml-2' + ' ';

	return (
		<button
			type='button'
			onClick={onClick}
			disabled={disabled}
			className={
				bgColorStyle +
				marginLeft +
				`text-white font-bold py-1 px-3 rounded` +
				additionalStyles
			}
		>
			{innerText}
		</button>
	);
}

export default Button;
