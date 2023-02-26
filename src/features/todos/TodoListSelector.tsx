import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { TagContext } from 'contexts';

function TodoListSelector() {
	const { tagStorageState } = useContext(TagContext);

	const itemStyle = 'block pl-4 hover:bg-slate-200 hover:text-slate-800';
	const activeItemStyle = ' bg-slate-800 text-slate-200 font-bold';

	return (
		<>
			<aside className='bg-slate-500 text-slate-800'>
				<h1 className='m-4 mb-2 font-bold text-xl'>todo list selector</h1>
				<NavLink
					to='/all'
					className={({ isActive }) =>
						isActive ? itemStyle + activeItemStyle : itemStyle
					}
				>
					all items
				</NavLink>
				{tagStorageState.tagStorage.map((item) => (
					<NavLink
						to={'/' + item.tagId}
						key={item.tagId}
						className={({ isActive }) =>
							isActive ? itemStyle + activeItemStyle : itemStyle
						}
					>
						{item.tagName}
					</NavLink>
				))}
			</aside>
		</>
	);
}

export default TodoListSelector;
