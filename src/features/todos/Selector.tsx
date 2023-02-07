import { ReactNode, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import './Selector.css';
import { TagContext } from 'contexts/tag-context';

function Selector() {
	const { tagStorageState } = useContext(TagContext);

	const selectorItemClass = 'selector-item';
	const selectorItemActiveClass = 'selector-item selector-item-active';

	const tagListNodes: Array<ReactNode> = [];
	if (tagStorageState !== null) {
		for (const item of tagStorageState.tagStorage) {
			tagListNodes.push(
				<NavLink
					to={'/' + item.tagId}
					key={item.tagId}
					className={({ isActive }) =>
						isActive ? selectorItemActiveClass : selectorItemClass
					}
				>
					{item.tagName}
				</NavLink>
			);
		}
	}

	return (
		<>
			<aside className='selector'>
				<h1 className='text-center'>todo list selector</h1>
				<NavLink
					to='/all'
					className={({ isActive }) =>
						isActive ? selectorItemActiveClass : selectorItemClass
					}
				>
					all items
				</NavLink>
				{tagListNodes}
			</aside>
		</>
	);
}

export default Selector;
