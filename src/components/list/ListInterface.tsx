import { useState } from 'react';
import 'css/ListInterface.css';

interface ListInterfaceProps {
	name: string;
	addTodo: (todoName: string) => void;
	clearList: () => void;
}

function ListInterface(props: ListInterfaceProps) {
	// TODO: must this be done with onChange after all?
	// useRef seems not to handle clearing input well
	// const todoNameRef = useRef<HTMLInputElement>(null);
	const [todoName, setTodoName] = useState<string>('');

	return (
		<div className='list-interface'>
			<h1>{props.name}</h1>
			<form className='list-interface-input'>
				<label htmlFor='todo-name'>todo name:</label>
				<input
					id='todo-name'
					type='text'
					value={todoName}
					onChange={(event) => setTodoName(event.target.value)}
				/>
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
					onClick={props.clearList}
				>
					clear list
				</button>
			</form>
		</div>
	);
}

export default ListInterface;
