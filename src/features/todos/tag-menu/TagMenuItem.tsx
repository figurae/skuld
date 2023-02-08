import { useState } from 'react';
import styles from './TagMenuItem.module.sass';
import { TagData } from 'contexts';

interface TagItemProps extends TagData {
	checked: boolean;
	itemId: number;
	switchTag: (tagId: number, itemId: number, checked: boolean) => void;
	removeTag: (tagId: number) => void;
}

function TagMenuItem(props: TagItemProps) {
	const [checked, setChecked] = useState(props.checked);
	// TODO: generalize this
	const forPrefix = 'checkbox' + '-';

	return (
		<form>
			<input
				id={forPrefix + props.tagId}
				type='checkbox'
				className={styles.checkbox}
				checked={checked}
				onChange={() => {
					props.switchTag(props.tagId, props.itemId, checked);
					// TODO: let TagMenu handle checked as well
					setChecked(!checked);
				}}
			/>
			<label htmlFor={forPrefix + props.tagId}>{props.tagName}</label>
			<button
				type='button'
				className={styles.removeButton}
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
