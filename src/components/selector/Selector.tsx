import { AppContext } from 'contexts/AppContext';
import { ReactNode, useContext } from 'react';
import './Selector.css';

function Selector() {
	console.log('triggered Selector()');
	const appContext = useContext(AppContext);

	const tagListNodes: Array<ReactNode> = [];
	if (appContext !== null) {
		for (const item of appContext.tagStorage) {
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
