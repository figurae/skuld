import { useContext, useEffect, useState } from 'react';
import 'css/TagMenuItem.css';
import { StorageContext } from 'contexts/storage-context';
import { TagContext, TagData } from 'contexts/tag-context';
import { storeTags } from 'helpers/local-storage';
import { Tag, TagAction } from 'reducers/tag-reducer';

interface TagItemProps extends TagData {
	checked: boolean;
	itemId: number;
}

function TagMenuItem(props: TagItemProps) {
	const { tagStorageState, tagStorageDispatch } = useContext(TagContext);
	const storageContext = useContext(StorageContext);

	if (storageContext !== null) {
		useEffect(() => {
			console.log('i have changed');
			storeTags(tagStorageState.tagStorage, storageContext.tagStorageKey);
		}, [tagStorageState]);
	}

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
					// OPTIMIZE: move this to TagMenu, take out of return and generalize
					const actionType = checked ? Tag.RemoveItem : Tag.AddItem;

					const tagAction: TagAction = {
						type: actionType,
						payload: {
							tagId: props.tagId,
							itemId: props.itemId,
						},
					};

					tagStorageDispatch(tagAction);
					setChecked(!checked);
				}}
			/>
			<label className='tag-menu-item-label' htmlFor={forPrefix + props.tagId}>
				{props.tagName}
			</label>
			<button
				type='button'
				onClick={() => {
					// FIXME: this definitely has to move outside
					const tagAction: TagAction = {
						type: Tag.Remove,
						payload: {
							tagId: props.tagId,
						},
					};

					tagStorageDispatch(tagAction);
				}}
			>
				&times;
			</button>
		</form>
	);
}

export default TagMenuItem;
