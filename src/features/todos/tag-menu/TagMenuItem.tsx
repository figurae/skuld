// TODO: this doesn't really need to be
// a separate component; move it to TagMenu

import { useState } from 'react';
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
				checked={checked}
				onChange={() => {
					props.switchTag(props.tagId, props.itemId, checked);
					// TODO: let TagMenu handle checked as well
					setChecked(!checked);
				}}
			/>
			<label className='pl-2' htmlFor={forPrefix + props.tagId}>
				{props.tagName}
			</label>
			<button
				type='button'
				className='ml-1 border bg-red-600 hover:bg-red-800 text-xs text-white font-bold px-1 pb-0.5 h-4 leading-[0px] rounded'
				onClick={() => {
					props.removeTag(props.tagId);
				}}
			>
				×
			</button>
		</form>
	);
}

export default TagMenuItem;
