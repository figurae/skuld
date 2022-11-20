import { ReactNode, useContext } from 'react';
import 'css/Selector.css';
import { StorageContext } from 'contexts/storage';

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
