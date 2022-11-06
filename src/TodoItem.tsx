import './TodoItem.css';
import TodoItemContent from './TodoItemContent';
import TodoItemFooter from './TodoItemFooter';

export interface TodoItemData {
	todoItemId: number;
	todoItemName: string;
	todoItemCreated: string;
}

export interface TodoItemProps {
	todoItem: TodoItemData;
	deleteTodoItem: (todoItemId: number) => void;
}

function TodoItem(props: TodoItemProps) {
	return (
		<article className='todo-item'>
			<TodoItemContent>
				<button
					type='button'
					onClick={() => props.deleteTodoItem(props.todoItem.todoItemId)}
				>
					X
				</button>
				<p>{props.todoItem.todoItemName}</p>
			</TodoItemContent>
			<TodoItemFooter>
				<p>added on: {props.todoItem.todoItemCreated}</p>
			</TodoItemFooter>
		</article>
	);
}

export default TodoItem;
