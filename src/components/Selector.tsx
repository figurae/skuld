import { ReactNode, useContext } from 'react';
import 'css/Selector.css';
import { TagContext } from 'contexts/tag-context';

function Selector() {
	const { tagStorageState, tagStorageDispatch } = useContext(TagContext);

	const tagListNodes: Array<ReactNode> = [];
	if (tagStorageState !== null) {
		for (const item of tagStorageState.tagStorage) {
			tagListNodes.push(<p key={item.tagId}>{item.tagName}</p>);
		}
	}

	return (
		<>
			<aside className='selector'>
				<h1 className='text-center'>todo list selector</h1>
				{tagListNodes}
			</aside>
		</>
	);
}

export default Selector;
