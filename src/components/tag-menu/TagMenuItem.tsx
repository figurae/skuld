import { useContext, useState } from 'react';
import 'css/TagMenuItem.css';
import { StorageContext, TagProps } from 'contexts/storage';
import { storeTags } from 'helpers/tag-management';

interface TagItemProps extends TagProps {
	checked: boolean;
	todoItemId: number;
}

function switchTag(tagId: number, todoItemId: number, tagTodos: Array<number>) {
	if (tagTodos.includes(todoItemId)) {
		// TODO: try and make this work like this after moving to TagMenu
		// tagTodos = tagTodos.filter((item) => item !== todoItemId);
		const index = tagTodos.indexOf(todoItemId);
		tagTodos.splice(index, 1);
	} else {
		tagTodos.push(todoItemId);
	}
}

function TagMenuItem(props: TagItemProps) {
	const storageContext = useContext(StorageContext);

	const [checked, setChecked] = useState(props.checked);
	const className = 'tag-menu-item-checkbox';
	// TODO: generalize this
	const forPrefix = className + '-';

	return (
		<form className='tag-menu-item'>
			<input
				id={forPrefix + props.tagId}
				type='checkbox'
				className={className}
				checked={checked}
				onChange={() => {
					// OPTIMIZE: move this to TagMenu
					if (storageContext !== null) {
						switchTag(
							props.tagId,
							props.todoItemId,
							storageContext.tagStorage[props.tagId].tagItems
						);
						setChecked(!checked);
						storeTags(storageContext);
					}
				}}
			/>
			<label className='tag-menu-item-label' htmlFor={forPrefix + props.tagId}>
				{props.tagName}
			</label>
		</form>
	);
}

export default TagMenuItem;
