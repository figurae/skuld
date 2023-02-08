import { useState } from 'react';
import styles from './ListInterface.module.sass';

interface ListInterfaceProps {
	name: string;
	addItem: (itemName: string) => void;
	clearList: () => void;
}

function ListInterface(props: ListInterfaceProps) {
	// TODO: must this be done with onChange after all?
	// useRef seems not to handle clearing input well
	// const todoNameRef = useRef<HTMLInputElement>(null);
	const [todoName, setTodoName] = useState<string>('');

	return (
		<div className={styles.element}>
			<h1 className={styles.header}>{props.name}</h1>
			<form className={styles.input}>
				<label htmlFor='todo-name'>todo name:</label>
				<input
					id='todo-name'
					type='text'
					value={todoName}
					onChange={(event) => setTodoName(event.target.value)}
				/>
				<button
					type='button'
					onClick={() => {
						props.addItem(todoName);
						setTodoName('');
					}}
				>
					add todo
				</button>
				<button type='button' onClick={props.clearList}>
					clear list
				</button>
			</form>
		</div>
	);
}

export default ListInterface;
