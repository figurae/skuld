import { AppContext, AppContextProps, TagProps } from 'contexts/AppContext';
import {
	Dispatch,
	ReactNode,
	SetStateAction,
	useContext,
	useEffect,
	useRef,
	useState,
} from 'react';
import TagMenuItem from './TagMenuItem';
import {
	getFromLocalStorage,
	setInLocalStorage,
} from 'helpers/LocalStorageHelper';
import './TagMenu.css';

interface TagMenuProps {
	itemId: number;
	setTagMenuState: Dispatch<SetStateAction<boolean>>;
	onClickOutside: () => void;
}

export function saveTags(appContext: AppContextProps) {
	if (appContext.tagStorage.length > 0) {
		setInLocalStorage(appContext.tagStorageKey, appContext.tagStorage);
	}
}

export function getTags(tagListKey: string): Array<TagProps> {
	const storedTagList = getFromLocalStorage(tagListKey);

	return storedTagList ? storedTagList : [];
}

export function addNewTag(appContext: AppContextProps, newTag: TagProps) {
	appContext.tagStorage.push(newTag);

	saveTags(appContext);
}

// OPTIMIZE: this should be easier to manage as a class
function TagMenu(props: TagMenuProps) {
	const tagMenu = useRef<HTMLElement>(null);
	const { onClickOutside } = props;
	const appContext = useContext(AppContext);
	const [newTag, setNewTag] = useState<string>('');

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

	// OPTIMIZE: think about generalizing/automating to-node conversion
	const tagListNodes: Array<ReactNode> = [];

	if (appContext !== null) {
		for (const item of appContext.tagStorage) {
			let checked = false;

			if (item.tagItems.includes(props.itemId)) {
				checked = true;
			}

			tagListNodes.push(
				<TagMenuItem
					key={item.tagId}
					checked={checked}
					todoItemId={props.itemId}
					tagId={item.tagId}
					tagName={item.tagName}
					tagItems={item.tagItems}
				></TagMenuItem>
			);
		}
	}

	return (
		<aside className='tag-menu' ref={tagMenu}>
			<h1>select tags:</h1>
			{tagListNodes}
			<form className='tag-menu-form'>
				<input
					className='tag-menu-input'
					value={newTag}
					onChange={(event) => setNewTag(event.target.value)}
				></input>
				<button
					className='tag-menu-button'
					type='button'
					onClick={() => {
						// TODO: refactor this into a separate function
						if (appContext !== null) {
							addNewTag(appContext, {
								tagId: appContext.currentTagId,
								tagName: newTag,
								tagItems: [props.itemId],
							});

							appContext.currentTagId += 1;
							setNewTag('');
						}
					}}
				>
					add
				</button>
			</form>
		</aside>
	);
}

export default TagMenu;
