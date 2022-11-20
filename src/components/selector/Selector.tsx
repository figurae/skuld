import { ReactNode, useContext } from 'react';
import './Selector.css';
import { StorageContext } from 'contexts/StorageContext';

function Selector() {
	console.log('triggered Selector()');
	const storageContext = useContext(StorageContext);

	const tagListNodes: Array<ReactNode> = [];
	if (storageContext !== null) {
		for (const item of storageContext.tagStorage) {
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
