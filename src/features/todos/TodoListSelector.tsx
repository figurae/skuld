import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { TodoListContext } from 'contexts';

function TodoListSelector() {
	const { todoListStorageState } = useContext(TodoListContext);

	const todoListNameStyle =
		'block pl-4 hover:bg-slate-200 hover:text-slate-800';
	const activeTodoListNameStyle = ' bg-slate-800 text-slate-200 font-bold';

	return (
		<>
			<aside className='bg-slate-500 text-slate-800'>
				<h1 className='m-4 mb-2 font-bold text-xl'>todo list selector</h1>
				<NavLink
					to='/all'
					className={({ isActive }) =>
						isActive
							? todoListNameStyle + activeTodoListNameStyle
							: todoListNameStyle
					}
				>
					all items
				</NavLink>
				{todoListStorageState.todoListStorage.map((todoList) => (
					<NavLink
						to={'/' + todoList.todoListId}
						key={todoList.todoListId}
						className={({ isActive }) =>
							isActive
								? todoListNameStyle + activeTodoListNameStyle
								: todoListNameStyle
						}
					>
						{todoList.todoListName}
					</NavLink>
				))}
			</aside>
		</>
	);
}

export default TodoListSelector;
