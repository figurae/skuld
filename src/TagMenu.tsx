import { AppContext, AppContextProps, TagProps } from 'AppContext';
import {
	Dispatch,
	ReactNode,
	SetStateAction,
	useContext,
	useEffect,
	useRef,
	useState,
} from 'react';
import TagItem from 'TagItem';
import { getFromLocalStorage, setInLocalStorage } from './LocalStorageHelper';
import './TagMenu.css';

interface TagMenuProps {
	todoItemId: number;
	setTagMenuState: Dispatch<SetStateAction<boolean>>;
	onClickOutside: () => void;
}

export function saveTags(appContext: AppContextProps) {
	if (appContext.tagListStorage.length > 0) {
		setInLocalStorage(appContext.tagListKey, appContext.tagListStorage);
	}
}

export function getTags(tagListKey: string): Array<TagProps> {
	const storedTagList = getFromLocalStorage(tagListKey);

	return storedTagList ? storedTagList : [];
}

export function addNewTag(appContext: AppContextProps, newTag: TagProps) {
	appContext.tagListStorage.push(newTag);

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
		for (const item of appContext.tagListStorage) {
			let checked = false;

			if (item.tagTodos.includes(props.todoItemId)) {
				checked = true;
			}

			tagListNodes.push(
				<TagItem
					key={item.tagId}
					checked={checked}
					todoItemId={props.todoItemId}
					tagId={item.tagId}
					tagName={item.tagName}
					tagTodos={item.tagTodos}
				></TagItem>
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
								tagTodos: [props.todoItemId],
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
