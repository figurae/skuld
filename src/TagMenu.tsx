import { Dispatch, SetStateAction, useEffect, useRef } from 'react';
import './TagMenu.css';

interface TagMenuProps {
	todoItemId: number;
	setTagMenuState: Dispatch<SetStateAction<boolean>>;
}

function TagMenu(props: TagMenuProps) {
	const tagMenu = useRef<HTMLElement>(null);

	useEffect(() => {
		// focus as soon as TagMenu is created for onBlur
		tagMenu.current?.focus();
	});

	return (
		<aside
			className='tag-menu'
			tabIndex={0}
			ref={tagMenu}
			onBlur={() => props.setTagMenuState(false)}
		>
			<h1>tag menu for todo no. {props.todoItemId}</h1>
		</aside>
	);
}

export default TagMenu;
