import { useContext, useEffect, useState } from 'react';
import 'css/TagMenuItem.css';
import { StorageContext } from 'contexts/storage-context';
import { TagContext, TagProps } from 'contexts/tag-context';
import { storeTags } from 'helpers/local-storage';
import { Tag, TagAction } from 'reducers/tag-reducer';

interface TagItemProps extends TagProps {
	checked: boolean;
	itemId: number;
}

function TagMenuItem(props: TagItemProps) {
	const { tagStorageState, tagStorageDispatch } = useContext(TagContext);
	const storageContext = useContext(StorageContext);

	if (storageContext !== null) {
		useEffect(() => {
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
					// OPTIMIZE: move this to TagMenu
					let actionType: Tag;

					if (checked === false) {
						actionType = Tag.AddItem;
					} else {
						actionType = Tag.RemoveItem;
					}

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
		</form>
	);
}

export default TagMenuItem;
