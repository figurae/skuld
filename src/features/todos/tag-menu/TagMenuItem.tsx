import { useState } from 'react';
import './TagMenuItem.css';
import { TagData } from 'contexts/tag-context';

interface TagItemProps extends TagData {
	checked: boolean;
	itemId: number;
	switchTag: (tagId: number, itemId: number, checked: boolean) => void;
	removeTag: (tagId: number) => void;
}

function TagMenuItem(props: TagItemProps) {
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
					props.switchTag(props.tagId, props.itemId, checked);
					// TODO: let TagMenu handle checked as well
					setChecked(!checked);
				}}
			/>
			<label className='tag-menu-item-label' htmlFor={forPrefix + props.tagId}>
				{props.tagName}
			</label>
			<button
				type='button'
				className='tag-menu-item-remove-button'
				onClick={() => {
					props.removeTag(props.tagId);
				}}
			>
				&times;
			</button>
		</form>
	);
}

export default TagMenuItem;
