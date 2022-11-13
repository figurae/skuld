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
import { getFromLocalStorage, setInLocalStorage } from './LocalStorageHelper';
import './TagMenu.css';

interface TagMenuProps {
	todoItemId: number;
	setTagMenuState: Dispatch<SetStateAction<boolean>>;
	onClickOutside: () => void;
}

export function saveTags(appContext: AppContextProps) {
	setInLocalStorage(appContext.tagListKey, appContext.tagListStorage);
}

export function getTags(tagListKey: string): Array<TagProps> {
	const storedTagList = getFromLocalStorage(tagListKey);

	return storedTagList ? storedTagList : [];
}

export function addNewTag(appContext: AppContextProps, newTag: TagProps) {
	appContext.tagListStorage.push(newTag);

	saveTags(appContext);
}

// OPTIMIZE: think about generalizing to-node conversion
function convertTagsToNodes(tagListStorage: Array<TagProps>): Array<ReactNode> {
	const tagListNodes: Array<ReactNode> = [];

	if (tagListStorage !== null) {
		for (const item of Object.values(tagListStorage)) {
			tagListNodes.push(<p>{item.tagName}</p>);
		}
	}

	return tagListNodes;
}

function TagMenu(props: TagMenuProps) {
	const tagMenu = useRef<HTMLElement>(null);
	const { onClickOutside } = props;
	const appContext = useContext(AppContext);
	const [newTag, setNewTag] = useState<string>('');
	const [currentTagId, setCurrentTagId] = useState<number>(0);

	let tagListNodes = null;
	if (appContext !== null) {
		tagListNodes = convertTagsToNodes(appContext.tagListStorage);
	}

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
						if (appContext !== null) {
							addNewTag(appContext, {
								tagId: currentTagId,
								tagName: newTag,
								tagTodos: [],
							});
						}
						setCurrentTagId(1);
					}}
				>
					add
				</button>
			</form>
		</aside>
	);
}

export default TagMenu;
