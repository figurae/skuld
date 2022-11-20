import {
	Dispatch,
	ReactNode,
	SetStateAction,
	useContext,
	useEffect,
	useRef,
	useState,
} from 'react';
import 'css/TagMenu.css';
import TagMenuItem from 'components/tag-menu/TagMenuItem';
import { TagContext } from 'contexts/tag-context';
import { Tag, TagAction } from 'reducers/tag-reducer';

interface TagMenuProps {
	itemId: number;
	setTagMenuState: Dispatch<SetStateAction<boolean>>;
	onClickOutside: () => void;
}

// OPTIMIZE: this should be easier to manage as a class
function TagMenu(props: TagMenuProps) {
	const tagMenu = useRef<HTMLElement>(null);
	const { onClickOutside } = props;
	const { tagStorageState, tagStorageDispatch } = useContext(TagContext);
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

	if (tagStorageState !== null) {
		for (const item of tagStorageState.tagStorage) {
			let checked = false;

			if (item.tagItems.includes(props.itemId)) {
				checked = true;
			}

			tagListNodes.push(
				<TagMenuItem
					key={item.tagId}
					checked={checked}
					itemId={props.itemId}
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
						const tagAction: TagAction = {
							type: Tag.Add,
							payload: {
								tagId: tagStorageState.currentTagId,
								tagName: newTag,
								tagItems: [props.itemId],
							},
						};

						tagStorageDispatch(tagAction);

						setNewTag('');
					}}
				>
					add
				</button>
			</form>
		</aside>
	);
}

export default TagMenu;
