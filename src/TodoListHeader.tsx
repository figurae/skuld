import { useState } from 'react';
import './TodoListHeader.css';

interface ITodoListHeaderProps {
	todoListName: string;
	addTodo: (todoName: string) => void;
	clearTodoList: () => void;
}

function TodoListHeader(props: ITodoListHeaderProps) {
	// TODO: must this be done with onChange after all?
	// useRef seems not to handle clearing input well
	// const todoNameRef = useRef<HTMLInputElement>(null);
	const [todoName, setTodoName] = useState<string>('');

	return (
		<div className='todo-list-header'>
			<h1>{props.todoListName}</h1>
			<form>
				<button
					type='button'
					className='todo-list-add-button'
					onClick={() => {
						props.addTodo(todoName);
						setTodoName('');
					}}
				>
					add todo
				</button>
				<button
					type='button'
					className='todo-list-clear-button'
					onClick={props.clearTodoList}
				>
					clear list
				</button>
				<div className='todo-input'>
					<label htmlFor='todo-name'>Name</label>
					<input
						id='todo-name'
						type='text'
						value={todoName}
						onChange={(event) => setTodoName(event.target.value)}
					/>
				</div>
			</form>
		</div>
	);
}

export default TodoListHeader;
