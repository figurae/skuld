import { useState } from 'react';
import { Button, Input, TodoListMenu } from 'features';
import { TodoItemData } from 'contexts';

export interface TodoItemProps {
	todoItem: TodoItemData;
	todoItemDisplayNumber: number;
	deleteTodoItem: (todoItemId: number) => void;
	editTodoItem: (todoItemId: number, newTodoItemName: string) => void;
}

function TodoItem(props: TodoItemProps) {
	const [isEditMode, setEditMode] = useState(false);
	const [newItemName, setNewItemName] = useState(props.todoItem.todoItemName);

	const [todoListMenuState, setTodoListMenuState] = useState(false);

	return (
		<article className='relative'>
			{isEditMode ? (
				<form onSubmit={(event) => event.preventDefault()}>
					<Input
						id='edit-todo-item-name'
						className='mb-2'
						autoFocus
						value={newItemName}
						onChange={(event: React.ChangeEvent) =>
							setNewItemName((event.target as HTMLInputElement).value)
						}
					/>
					<Button
						innerText='save'
						// TODO: this is temporary, ultimately implement outside click detection
						// as used in TodoListMenu + enter support
						onClick={() => {
							setEditMode(false);
							props.editTodoItem(props.todoItem.todoItemId, newItemName);
						}}
					/>
					<br />
					<Button
						first
						innerText='lists'
						disabled={todoListMenuState}
						onClick={() => setTodoListMenuState(true)}
					/>
					<Button
						type='warning'
						innerText='delete'
						onClick={() => props.deleteTodoItem(props.todoItem.todoItemId)}
					/>
				</form>
			) : (
				<p onClick={() => setEditMode(true)}>
					{
						// NOTE: I think this can be done easier with contentEditable
						// TODO: place todoItemDisplayNumber in a separate element with fixed width
						// FIXME: when clicking on an item placed higher than the one
						// currently being edited the behavior is inconsistent with
						// clicking on a lower one (begins editing upper one, closes
						// edit mode otherwise)
					}
					<span className='text-slate-600'>{props.todoItemDisplayNumber}.</span>{' '}
					{props.todoItem.todoItemName}
				</p>
			)}
			{todoListMenuState ? (
				<TodoListMenu
					todoItemId={props.todoItem.todoItemId}
					setTodoListMenuState={setTodoListMenuState}
					onClickOutside={() => {
						setTodoListMenuState(false);
					}}
				></TodoListMenu>
			) : (
				''
			)}
		</article>
	);
}

export default TodoItem;
