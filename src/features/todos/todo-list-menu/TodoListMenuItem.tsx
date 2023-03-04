// TODO: this doesn't really need to be
// a separate component; move it to TodoListMenu

import { useState } from 'react';
import { TodoListData } from 'contexts';

interface TodoListMenuItemProps extends TodoListData {
	checked: boolean;
	todoItemId: number;
	switchTodoList: (
		todoListId: number,
		todoItemId: number,
		checked: boolean
	) => void;
	removeTodoList: (todoListId: number) => void;
}

function TodoListMenuItem(props: TodoListMenuItemProps) {
	const [checked, setChecked] = useState(props.checked);
	// TODO: generalize this
	const forPrefix = 'checkbox' + '-';

	return (
		<form>
			<input
				id={forPrefix + props.todoListId}
				type='checkbox'
				checked={checked}
				onChange={() => {
					props.switchTodoList(props.todoListId, props.todoItemId, checked);
					// TODO: let TodoListMenu handle checked as well
					setChecked(!checked);
				}}
			/>
			<label className='pl-2' htmlFor={forPrefix + props.todoListId}>
				{props.todoListName}
			</label>
			<button
				type='button'
				className='ml-1 border bg-red-600 hover:bg-red-800 text-xs text-white font-bold px-1 pb-0.5 h-4 leading-[0px] rounded'
				onClick={() => {
					props.removeTodoList(props.todoListId);
				}}
			>
				×
			</button>
		</form>
	);
}

export default TodoListMenuItem;
