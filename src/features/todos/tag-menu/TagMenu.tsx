import {
	Dispatch,
	ReactNode,
	SetStateAction,
	useContext,
	useEffect,
	useRef,
	useState,
} from 'react';
import './TagMenu.css';
import { TagMenuItem } from 'features';
import { TagContext, StorageContext } from 'contexts';
import { Tag, TagAction } from 'reducers';
import { setItems } from 'utils';

interface TagMenuProps {
	itemId: number;
	setTagMenuState: Dispatch<SetStateAction<boolean>>;
	onClickOutside: () => void;
}

// OPTIMIZE: this should be easier to manage as a class
function TagMenu(props: TagMenuProps) {
	const tagMenu = useRef<HTMLElement>(null);
	const { onClickOutside } = props;
	const storageContext = useContext(StorageContext);
	const { tagStorageState, tagStorageDispatch } = useContext(TagContext);
	const [newTag, setNewTag] = useState<string>('');
	// HACK: skip useEffect firing on mount
	const [isFirstRun, setIsFirstRun] = useState(true);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				tagMenu.current !== null &&
				!tagMenu.current.contains(event.target as Node)
			) {
				onClickOutside && onClickOutside();
			}
		};
		document.addEventListener('click', handleClickOutside, true);

		return () => {
			document.removeEventListener('click', handleClickOutside, true);
		};
	}, [onClickOutside]);

	if (storageContext !== null) {
		useEffect(() => {
			if (isFirstRun) {
				setIsFirstRun(false);
			} else {
				setItems(tagStorageState.tagStorage, storageContext.tagStorageKey);
			}
		}, [tagStorageState]);
	}
	// TODO: think about generalizing all reducer calls
	const addTag = (tagName: string, itemId: number) => {
		const tagAction: TagAction = {
			type: Tag.Add,
			payload: {
				tagId: tagStorageState.currentTagId,
				tagName,
				tagItems: [itemId],
			},
		};

		tagStorageDispatch(tagAction);

		setNewTag('');
	};

	const switchTag = (tagId: number, itemId: number, checked: boolean) => {
		const actionType = checked ? Tag.RemoveItem : Tag.AddItem;

		const tagAction: TagAction = {
			type: actionType,
			payload: {
				tagId,
				itemId,
			},
		};

		tagStorageDispatch(tagAction);
	};

	const removeTag = (tagId: number) => {
		const tagAction: TagAction = {
			type: Tag.Remove,
			payload: {
				tagId,
			},
		};

		tagStorageDispatch(tagAction);
	};

	// OPTIMIZE: generalize/automate to-node conversion
	const tagNodes: Array<ReactNode> = [];

	if (tagStorageState !== null) {
		for (const item of tagStorageState.tagStorage) {
			let checked = false;

			if (item.tagItems.includes(props.itemId)) {
				checked = true;
			}

			tagNodes.push(
				<TagMenuItem
					key={item.tagId}
					checked={checked}
					itemId={props.itemId}
					tagId={item.tagId}
					tagName={item.tagName}
					tagItems={item.tagItems}
					switchTag={switchTag}
					removeTag={removeTag}
				></TagMenuItem>
			);
		}
	}

	return (
		<aside className='tag-menu' ref={tagMenu}>
			<h1>select tags:</h1>
			{tagNodes}
			<form className='tag-menu-form'>
				<input
					className='tag-menu-input'
					value={newTag}
					onChange={(event) => setNewTag(event.target.value)}
				></input>
				<button
					className='tag-menu-button'
					type='button'
					onClick={() => addTag(newTag, props.itemId)}
				>
					add
				</button>
			</form>
		</aside>
	);
}

export default TagMenu;
