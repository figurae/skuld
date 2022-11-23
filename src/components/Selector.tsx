import { ReactNode, useContext } from 'react';
import { Link } from 'react-router-dom';
import 'css/Selector.css';
import { TagContext } from 'contexts/tag-context';

function Selector() {
	const { tagStorageState } = useContext(TagContext);

	const tagListNodes: Array<ReactNode> = [];
	if (tagStorageState !== null) {
		for (const item of tagStorageState.tagStorage) {
			// TODO: unhardcode this
			tagListNodes.push(
				<Link
					to={'/' + item.tagId}
					key={item.tagId}
					style={{ display: 'block' }}
				>
					{item.tagName}
				</Link>
			);
		}
	}

	return (
		<>
			<aside className='selector'>
				<h1 className='text-center'>todo list selector</h1>
				<Link to='/all' style={{ display: 'block' }}>
					all items
				</Link>
				{tagListNodes}
			</aside>
		</>
	);
}

export default Selector;
