import { ReactNode, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Selector.module.sass';
import { TagContext } from 'contexts';

function Selector() {
	const { tagStorageState } = useContext(TagContext);

	const tagListNodes: Array<ReactNode> = [];
	if (tagStorageState !== null) {
		for (const item of tagStorageState.tagStorage) {
			tagListNodes.push(
				<NavLink
					to={'/' + item.tagId}
					key={item.tagId}
					className={({ isActive }) =>
						isActive ? `${styles.item} ${styles.itemActive}` : styles.item
					}
				>
					{item.tagName}
				</NavLink>
			);
		}
	}

	return (
		<>
			<aside className={styles.element}>
				<h1 className={styles.header}>todo list selector</h1>
				<NavLink
					to='/all'
					className={({ isActive }) =>
						isActive ? `${styles.item} ${styles.itemActive}` : styles.item
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
