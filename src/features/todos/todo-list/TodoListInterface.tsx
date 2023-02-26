import { Button, Input } from 'features';
import { useState } from 'react';

interface ListInterfaceProps {
	name: string;
	addItem: (itemName: string) => void;
	clearList: () => void;
}

function TodoListInterface(props: ListInterfaceProps) {
	// TODO: must this be done with onChange after all?
	// useRef seems not to handle clearing input well
	// const todoNameRef = useRef<HTMLInputElement>(null);
	const [todoName, setTodoName] = useState<string>('');

	return (
		<div className='p-4 bg-slate-400 text-left'>
			<h1 className='pb-2 text-slate-800 text-xl font-bold'>{props.name}</h1>
			<form onSubmit={(event) => event.preventDefault()}>
				<Input
					id='todo-name'
					value={todoName}
					placeholder='new todo name'
					onChange={(event) =>
						setTodoName((event.target as HTMLInputElement).value)
					}
				/>
				<Button
					onClick={() => {
						props.addItem(todoName);
						setTodoName('');
					}}
					innerText='add todo'
				/>
				<Button
					onClick={props.clearList}
					type='warning'
					innerText='clear list'
				/>
			</form>
		</div>
	);
}

export default TodoListInterface;
