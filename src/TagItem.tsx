import { useContext, useState } from 'react';
import { AppContext, TagProps } from 'AppContext';
import './TagItem.css';
import { saveTags } from 'TagMenu';

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

function TagItem(props: TagItemProps) {
	const appContext = useContext(AppContext);

	const [checked, setChecked] = useState(props.checked);
	const className = 'tag-item-checkbox';
	// TODO: generalize this
	const forPrefix = className + '-';

	return (
		<form className='tag-item'>
			<input
				id={forPrefix + props.tagId}
				type='checkbox'
				className={className}
				checked={checked}
				onChange={() => {
					// OPTIMIZE: move this to TagMenu
					if (appContext !== null) {
						switchTag(
							props.tagId,
							props.todoItemId,
							appContext.tagListStorage[props.tagId].tagTodos
						);
						setChecked(!checked);
						saveTags(appContext);
					}
				}}
			/>
			<label className='tag-item-label' htmlFor={forPrefix + props.tagId}>
				{props.tagName}
			</label>
		</form>
	);
}

export default TagItem;
