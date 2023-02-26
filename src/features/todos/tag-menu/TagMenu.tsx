import {
	Dispatch,
	SetStateAction,
	useContext,
	useEffect,
	useRef,
	useState,
} from 'react';
import { Button, Input, TagMenuItem } from 'features';
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

	// TODO: generalize this for use elsewhere
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

	return (
		<aside
			className='absolute top-20 bg-white rounded px-3 py-2 z-10'
			ref={tagMenu}
		>
			{tagStorageState.tagStorage.map((tag) => {
				let checked = false;

				if (tag.tagItems.includes(props.itemId)) {
					checked = true;
				}

				// OPTIMIZE: this seems excessive
				return (
					<TagMenuItem
						key={tag.tagId}
						checked={checked}
						itemId={props.itemId}
						tagId={tag.tagId}
						tagName={tag.tagName}
						tagItems={tag.tagItems}
						switchTag={switchTag}
						removeTag={removeTag}
					/>
				);
			})}
			<form onSubmit={(event) => event.preventDefault()}>
				<Input
					id='add-new-list'
					value={newTag}
					onChange={(event: React.ChangeEvent) =>
						setNewTag((event.target as HTMLInputElement).value)
					}
				/>
				<Button innerText='add' onClick={() => addTag(newTag, props.itemId)} />
			</form>
		</aside>
	);
}

export default TagMenu;
