import { Button, Input } from 'features';
import { useState } from 'react';

interface TodoListInterfaceProps {
	todoListName: string;
	addTodoItem: (todoItemName: string) => void;
	clearAllTodoItems: () => void;
}

function TodoListInterface(props: TodoListInterfaceProps) {
	// TODO: must this be done with onChange after all?
	// useRef seems not to handle clearing input well
	// const todoNameRef = useRef<HTMLInputElement>(null);
	const [todoItemName, setTodoItemName] = useState<string>('');

	return (
		<div className='p-4 bg-slate-400 text-left'>
			<h1 className='pb-2 text-slate-800 text-xl font-bold'>
				{props.todoListName}
			</h1>
			<form onSubmit={(event) => event.preventDefault()}>
				<Input
					id='todo-item-name'
					value={todoItemName}
					placeholder='new todo name'
					onChange={(event) =>
						setTodoItemName((event.target as HTMLInputElement).value)
					}
				/>
				<Button
					onClick={() => {
						props.addTodoItem(todoItemName);
						setTodoItemName('');
					}}
					innerText='add todo'
				/>
				<Button
					onClick={props.clearAllTodoItems}
					type='warning'
					innerText='clear list'
				/>
			</form>
		</div>
	);
}

export default TodoListInterface;
