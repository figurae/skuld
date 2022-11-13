import { AppContext, AppContextProps, TagListProps } from 'AppContext';
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
	if (appContext !== null && appContext.tagListStorage !== null) {
		setInLocalStorage(appContext.tagListKey, appContext.tagListStorage);
	}
}

export function loadTags(appContext: AppContextProps) {
	if (appContext !== null) {
		appContext.tagListStorage = getFromLocalStorage(appContext.tagListKey);
	}
}

// OPTIMIZE: think about generalizing to-node conversion
function convertTagsToNodes(tagListStorage: TagListProps): Array<ReactNode> {
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

	let tagListNodes = null;
	// TODO: this is pretty sus, why both null/undefined check and 'as TagListProps'?
	if (appContext?.tagListStorage !== null || undefined) {
		tagListNodes = convertTagsToNodes(
			appContext?.tagListStorage as TagListProps
		);
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
			<form>
				<input
					className='tag-menu-input'
					value={newTag}
					onChange={(event) => setNewTag(event.target.value)}
				></input>
				<button type='button'>add tag</button>
			</form>
		</aside>
	);
}

export default TagMenu;
