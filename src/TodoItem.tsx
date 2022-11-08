import './TodoItem.css';
import TodoItemContent from './TodoItemContent';
import TodoItemFooter from './TodoItemFooter';

export interface TodoItemData {
	todoItemId: number;
	todoItemName: string;
	todoItemDescription?: string;
	todoItemCreated: Date;
	todoItemCompleted?: Date;
	todoItemProgress: number;
	todoItemTags?: Array<number>;
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
				<p>
					added on: {props.todoItem.todoItemCreated.toLocaleString('gb-GB')}
				</p>
			</TodoItemFooter>
		</article>
	);
}

export default TodoItem;
