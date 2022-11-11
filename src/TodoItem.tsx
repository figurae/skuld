import { useState } from 'react';
import './TodoItem.css';
import TodoItemContent from './TodoItemContent';
import TodoItemFooter from './TodoItemFooter';

export interface TodoItemData {
	todoItemId: number;
	todoItemName: string;
	todoItemDescription?: string;
	todoItemCreated: Date;
	todoItemEdited?: Date;
	todoItemCompleted?: Date;
	todoItemProgress: number;
	todoItemTags?: Array<number>;
}

export interface TodoItemProps {
	todoItem: TodoItemData;
	deleteTodoItem: (todoItemId: number) => void;
	editTodoItem: (todoItemId: number, newTodoItemName: string) => void;
}

function TodoItem(props: TodoItemProps) {
	const [isEditMode, setEditMode] = useState(false);
	const [newTodoItemName, setNewTodoItemName] = useState(
		props.todoItem.todoItemName
	);

	return (
		<article className='todo-item'>
			<TodoItemContent>
				<button
					type='button'
					onClick={() => props.deleteTodoItem(props.todoItem.todoItemId)}
				>
					X
				</button>

				{isEditMode ? (
					<form>
						<input
							autoFocus
							value={newTodoItemName}
							onChange={(event) => setNewTodoItemName(event.target.value)}
							onBlur={() => {
								setEditMode(false);
								props.editTodoItem(props.todoItem.todoItemId, newTodoItemName);
							}}
						/>
						<button type='button'>save</button>
					</form>
				) : (
					<p onClick={() => setEditMode(true)}>{props.todoItem.todoItemName}</p>
				)}
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
